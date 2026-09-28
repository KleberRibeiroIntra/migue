using System;
using System.Linq;
using Microsoft.EntityFrameworkCore.Migrations;
using Migue.Domain.Data.SeedData;

#nullable disable

namespace Migue.Domain.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddScoreReasonCategoryTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ScoreReasonCategory",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: true),
                    Order = table.Column<int>(type: "INTEGER", nullable: false),
                    NavigationId = table.Column<Guid>(type: "TEXT", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "TEXT", nullable: false),
                    CreatedBy = table.Column<Guid>(type: "TEXT", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "TEXT", nullable: true),
                    UpdatedBy = table.Column<Guid>(type: "TEXT", nullable: true),
                    Active = table.Column<bool>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ScoreReasonCategory", x => x.Id);
                    table.UniqueConstraint("AK_ScoreReasonCategory_NavigationId", x => x.NavigationId);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ScoreReasonCategory_NavigationId",
                table: "ScoreReasonCategory",
                column: "NavigationId",
                unique: true);

            // Banco que já tem justificativas: cria aqui as categorias do antigo enum pra poder converter.
            // Banco novo fica vazio e o DbSeeder cria as categorias com os mesmos ids.
            var order = 0;
            foreach (var category in ScoreReasonCategorySeedData.Categories)
            {
                order++;
                migrationBuilder.Sql($"""
                    INSERT INTO "ScoreReasonCategory" ("Name", "Description", "Order", "NavigationId", "CreatedAt", "CreatedBy", "Active")
                    SELECT '{category.Name}', '{category.Description}', {order}, '{ToSqlite(category.Id)}',
                        strftime('%Y-%m-%d %H:%M:%S', 'now'), '00000000-0000-0000-0000-000000000000', 1
                    WHERE EXISTS (SELECT 1 FROM "ScoreReason");
                    """);
            }

            migrationBuilder.AddColumn<Guid>(
                name: "CategoryId",
                table: "ScoreReason",
                type: "TEXT",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            var toCategoryId = string.Join(" ", ScoreReasonCategorySeedData.Categories
                .Select(c => $"WHEN {c.LegacyValue} THEN '{ToSqlite(c.Id)}'"));
            migrationBuilder.Sql($"""UPDATE "ScoreReason" SET "CategoryId" = CASE "Category" {toCategoryId} END;""");

            migrationBuilder.DropColumn(
                name: "Category",
                table: "ScoreReason");

            migrationBuilder.CreateIndex(
                name: "IX_ScoreReason_CategoryId",
                table: "ScoreReason",
                column: "CategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_ScoreReason_ScoreReasonCategory_CategoryId",
                table: "ScoreReason",
                column: "CategoryId",
                principalTable: "ScoreReasonCategory",
                principalColumn: "NavigationId",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ScoreReason_ScoreReasonCategory_CategoryId",
                table: "ScoreReason");

            migrationBuilder.DropIndex(
                name: "IX_ScoreReason_CategoryId",
                table: "ScoreReason");

            migrationBuilder.AddColumn<int>(
                name: "Category",
                table: "ScoreReason",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            // categoria criada pelo cadastro não existe no enum: vira Other (0)
            var toLegacyValue = string.Join(" ", ScoreReasonCategorySeedData.Categories
                .Select(c => $"WHEN '{ToSqlite(c.Id)}' THEN {c.LegacyValue}"));
            migrationBuilder.Sql($"""UPDATE "ScoreReason" SET "Category" = CASE "CategoryId" {toLegacyValue} ELSE 0 END;""");

            migrationBuilder.DropColumn(
                name: "CategoryId",
                table: "ScoreReason");

            // O EF só reconstrói ScoreReason (sem a FK) no fim da migration, depois do DROP TABLE; sem isso o drop
            // falha por FK. A própria reconstrução religa foreign_keys no final.
            migrationBuilder.Sql("PRAGMA foreign_keys = 0;", suppressTransaction: true);

            migrationBuilder.DropTable(
                name: "ScoreReasonCategory");
        }

        /// <summary>O provider do SQLite grava Guid como TEXT em maiúsculas.</summary>
        private static string ToSqlite(Guid id) => id.ToString().ToUpperInvariant();
    }
}
