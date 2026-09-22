using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migue.Domain.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddSoftSkillOptionAndNavigationCollections : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SoftSkillScaleOption");

            migrationBuilder.AddUniqueConstraint(
                name: "AK_SoftSkill_NavigationId",
                table: "SoftSkill",
                column: "NavigationId");

            migrationBuilder.CreateTable(
                name: "SoftSkillOption",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    SoftSkillId = table.Column<Guid>(type: "TEXT", nullable: false),
                    Value = table.Column<int>(type: "INTEGER", nullable: false),
                    Label = table.Column<string>(type: "TEXT", nullable: false),
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
                    table.PrimaryKey("PK_SoftSkillOption", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SoftSkillOption_SoftSkill_SoftSkillId",
                        column: x => x.SoftSkillId,
                        principalTable: "SoftSkill",
                        principalColumn: "NavigationId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_SoftSkillOption_NavigationId",
                table: "SoftSkillOption",
                column: "NavigationId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_SoftSkillOption_SoftSkillId",
                table: "SoftSkillOption",
                column: "SoftSkillId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SoftSkillOption");

            migrationBuilder.DropUniqueConstraint(
                name: "AK_SoftSkill_NavigationId",
                table: "SoftSkill");

            migrationBuilder.CreateTable(
                name: "SoftSkillScaleOption",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Active = table.Column<bool>(type: "INTEGER", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "TEXT", nullable: false),
                    CreatedBy = table.Column<Guid>(type: "TEXT", nullable: false),
                    Label = table.Column<string>(type: "TEXT", nullable: false),
                    NavigationId = table.Column<Guid>(type: "TEXT", nullable: false),
                    Order = table.Column<int>(type: "INTEGER", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "TEXT", nullable: true),
                    UpdatedBy = table.Column<Guid>(type: "TEXT", nullable: true),
                    Value = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SoftSkillScaleOption", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_SoftSkillScaleOption_NavigationId",
                table: "SoftSkillScaleOption",
                column: "NavigationId",
                unique: true);
        }
    }
}
