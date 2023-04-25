using System.Globalization;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Localization;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using MyPocket.Infra.IoC.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);
var connectionString = builder.Configuration.GetConnectionString("MyPocketDB");
var key = builder.Configuration.GetValue<string>("JWT:key");
var supportedCultures = new List<CultureInfo>{
    new CultureInfo("en"),
    new CultureInfo("pt-BR")
  };
// Add services to the container.
builder.Services.AddInfrastructure(connectionString);
builder.Services.AddAuthentication(opt =>
{
  opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
  opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(x =>
{
  x.RequireHttpsMetadata = false;
  x.SaveToken = true;
  x.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
  {
    ValidateIssuerSigningKey = true,
    IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(key)),
    ValidateIssuer = false,
    ValidateAudience = false
  };
});

builder.Services.AddServices();
builder.Services.AddControllers().AddNewtonsoftJson();
builder.Services.AddLocalization(opt =>
{
  opt.ResourcesPath = "Resources";
});
builder.Services.Configure<RequestLocalizationOptions>(options =>
{
  options.DefaultRequestCulture = new RequestCulture("en");
  options.SupportedCultures = supportedCultures;
  options.SupportedUICultures = supportedCultures;
});
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
  app.UseSwagger();
  app.UseSwaggerUI();
}
app.UseCors(opt => opt.WithOrigins("http://localhost:3000", "http://my-pocket.net", "https://my-pocket.net").AllowAnyHeader().AllowAnyMethod());
app.UseHttpsRedirection();
var localizationOptions = new RequestLocalizationOptions
{
  ApplyCurrentCultureToResponseHeaders = true,
  DefaultRequestCulture = new Microsoft.AspNetCore.Localization.RequestCulture(supportedCultures[0]),
  SupportedCultures = supportedCultures,
  SupportedUICultures = supportedCultures
};
app.UseRequestLocalization(localizationOptions);
app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();
var options = app.Services.GetService<IOptions<RequestLocalizationOptions>>();
app.UseRequestLocalization(options.Value);

/* app.UseEndpoints(endpoints =>
            {
              endpoints.MapControllers();
              endpoints.MapControllerRoute("default", "{culture:culture}/{controller=Home}/{action=Index}/{id?}");
            }); */
app.MapControllers();
app.MapGet("/", () => "MyPocket API running");

app.Run();
