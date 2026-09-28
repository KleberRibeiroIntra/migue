using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migue.Domain.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddActivityProjects : Migration
    {
        /// <summary>Guid novo no formato que o provider do SQLite grava (TEXT em maiúsculas).</summary>
        private const string NewGuidSql =
            "upper(hex(randomblob(4)) || '-' || hex(randomblob(2)) || '-' || hex(randomblob(2)) || '-' || hex(randomblob(2)) || '-' || hex(randomblob(6)))";

        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ActivityProject",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    ActivityId = table.Column<Guid>(type: "TEXT", nullable: false),
                    ProjectId = table.Column<Guid>(type: "TEXT", nullable: false),
                    NavigationId = table.Column<Guid>(type: "TEXT", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "TEXT", nullable: false),
                    CreatedBy = table.Column<Guid>(type: "TEXT", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "TEXT", nullable: true),
                    UpdatedBy = table.Column<Guid>(type: "TEXT", nullable: true),
                    Active = table.Column<bool>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ActivityProject", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ActivityProject_Activity_ActivityId",
                        column: x => x.ActivityId,
                        principalTable: "Activity",
                        principalColumn: "NavigationId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ActivityProject_Project_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Project",
                        principalColumn: "NavigationId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ActivityProject_ActivityId_ProjectId",
                table: "ActivityProject",
                columns: new[] { "ActivityId", "ProjectId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_ActivityProject_NavigationId",
                table: "ActivityProject",
                column: "NavigationId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_ActivityProject_ProjectId",
                table: "ActivityProject",
                column: "ProjectId");

            // Leva o projeto único de cada atividade pra tabela de vínculo antes de apagar a coluna.
            migrationBuilder.Sql($"""
                INSERT INTO "ActivityProject" ("ActivityId", "ProjectId", "NavigationId", "CreatedAt", "CreatedBy", "Active")
                SELECT "NavigationId", "ProjectId", {NewGuidSql}, "CreatedAt", "CreatedBy", 1
                FROM "Activity"
                WHERE "ProjectId" IS NOT NULL;
                """);

            migrationBuilder.DropForeignKey(
                name: "FK_Activity_Project_ProjectId",
                table: "Activity");

            migrationBuilder.DropIndex(
                name: "IX_Activity_ProjectId",
                table: "Activity");

            migrationBuilder.DropColumn(
                name: "ProjectId",
                table: "Activity");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "ProjectId",
                table: "Activity",
                type: "TEXT",
                nullable: true);

            // A coluna só guarda um projeto: fica o primeiro vínculo, os outros se perdem.
            migrationBuilder.Sql("""
                UPDATE "Activity" SET "ProjectId" = (
                    SELECT ap."ProjectId" FROM "ActivityProject" ap
                    WHERE ap."ActivityId" = "Activity"."NavigationId"
                    ORDER BY ap."Id"
                    LIMIT 1);
                """);

            migrationBuilder.DropTable(
                name: "ActivityProject");

            migrationBuilder.CreateIndex(
                name: "IX_Activity_ProjectId",
                table: "Activity",
                column: "ProjectId");

            migrationBuilder.AddForeignKey(
                name: "FK_Activity_Project_ProjectId",
                table: "Activity",
                column: "ProjectId",
                principalTable: "Project",
                principalColumn: "NavigationId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
