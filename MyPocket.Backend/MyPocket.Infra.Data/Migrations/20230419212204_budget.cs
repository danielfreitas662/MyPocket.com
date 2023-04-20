using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MyPocket.Infra.Data.Migrations
{
    public partial class budget : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Budgets_Categories_CategoryId",
                table: "Budgets");

            migrationBuilder.DropColumn(
                name: "Amount",
                table: "Budgets");

            migrationBuilder.RenameColumn(
                name: "CategoryId",
                table: "Budgets",
                newName: "UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Budgets_CategoryId",
                table: "Budgets",
                newName: "IX_Budgets_UserId");

            migrationBuilder.CreateTable(
                name: "BudgetItems",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    Amount = table.Column<decimal>(type: "numeric", nullable: false),
                    CategoryId = table.Column<string>(type: "text", nullable: false),
                    BudgetId = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BudgetItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BudgetItems_Budgets_BudgetId",
                        column: x => x.BudgetId,
                        principalTable: "Budgets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_BudgetItems_Categories_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "Categories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BudgetItems_BudgetId",
                table: "BudgetItems",
                column: "BudgetId");

            migrationBuilder.CreateIndex(
                name: "IX_BudgetItems_CategoryId",
                table: "BudgetItems",
                column: "CategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Budgets_AspNetUsers_UserId",
                table: "Budgets",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Budgets_AspNetUsers_UserId",
                table: "Budgets");

            migrationBuilder.DropTable(
                name: "BudgetItems");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Budgets",
                newName: "CategoryId");

            migrationBuilder.RenameIndex(
                name: "IX_Budgets_UserId",
                table: "Budgets",
                newName: "IX_Budgets_CategoryId");

            migrationBuilder.AddColumn<decimal>(
                name: "Amount",
                table: "Budgets",
                type: "numeric",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddForeignKey(
                name: "FK_Budgets_Categories_CategoryId",
                table: "Budgets",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
