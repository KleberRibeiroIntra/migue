using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migue.Domain.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddUserSoftSkillAndUserCompetencyHistory : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddUniqueConstraint(
                name: "AK_Users_NavigationId",
                table: "Users",
                column: "NavigationId");

            migrationBuilder.AddUniqueConstraint(
                name: "AK_SoftSkills_NavigationId",
                table: "SoftSkills",
                column: "NavigationId");

            migrationBuilder.AddUniqueConstraint(
                name: "AK_Competencies_NavigationId",
                table: "Competencies",
                column: "NavigationId");

            migrationBuilder.CreateTable(
                name: "UserCompetencies",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    UserId = table.Column<Guid>(type: "TEXT", nullable: false),
                    CompetencyId = table.Column<Guid>(type: "TEXT", nullable: false),
                    Rating = table.Column<int>(type: "INTEGER", nullable: false),
                    NavigationId = table.Column<Guid>(type: "TEXT", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "TEXT", nullable: false),
                    CreatedBy = table.Column<Guid>(type: "TEXT", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "TEXT", nullable: true),
                    UpdatedBy = table.Column<Guid>(type: "TEXT", nullable: true),
                    Active = table.Column<bool>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserCompetencies", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserCompetencies_Competencies_CompetencyId",
                        column: x => x.CompetencyId,
                        principalTable: "Competencies",
                        principalColumn: "NavigationId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_UserCompetencies_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "NavigationId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "UserSoftSkills",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    UserId = table.Column<Guid>(type: "TEXT", nullable: false),
                    SoftSkillId = table.Column<Guid>(type: "TEXT", nullable: false),
                    Rating = table.Column<int>(type: "INTEGER", nullable: false),
                    NavigationId = table.Column<Guid>(type: "TEXT", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "TEXT", nullable: false),
                    CreatedBy = table.Column<Guid>(type: "TEXT", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "TEXT", nullable: true),
                    UpdatedBy = table.Column<Guid>(type: "TEXT", nullable: true),
                    Active = table.Column<bool>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserSoftSkills", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserSoftSkills_SoftSkills_SoftSkillId",
                        column: x => x.SoftSkillId,
                        principalTable: "SoftSkills",
                        principalColumn: "NavigationId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_UserSoftSkills_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "NavigationId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserCompetencies_CompetencyId",
                table: "UserCompetencies",
                column: "CompetencyId");

            migrationBuilder.CreateIndex(
                name: "IX_UserCompetencies_NavigationId",
                table: "UserCompetencies",
                column: "NavigationId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_UserCompetencies_UserId",
                table: "UserCompetencies",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_UserSoftSkills_NavigationId",
                table: "UserSoftSkills",
                column: "NavigationId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_UserSoftSkills_SoftSkillId",
                table: "UserSoftSkills",
                column: "SoftSkillId");

            migrationBuilder.CreateIndex(
                name: "IX_UserSoftSkills_UserId",
                table: "UserSoftSkills",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserCompetencies");

            migrationBuilder.DropTable(
                name: "UserSoftSkills");

            migrationBuilder.DropUniqueConstraint(
                name: "AK_Users_NavigationId",
                table: "Users");

            migrationBuilder.DropUniqueConstraint(
                name: "AK_SoftSkills_NavigationId",
                table: "SoftSkills");

            migrationBuilder.DropUniqueConstraint(
                name: "AK_Competencies_NavigationId",
                table: "Competencies");
        }
    }
}
