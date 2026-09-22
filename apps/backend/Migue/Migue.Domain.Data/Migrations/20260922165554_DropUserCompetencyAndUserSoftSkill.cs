using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migue.Domain.Data.Migrations
{
    /// <inheritdoc />
    public partial class DropUserCompetencyAndUserSoftSkill : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserCompetency");

            migrationBuilder.DropTable(
                name: "UserSoftSkill");

            migrationBuilder.DropUniqueConstraint(
                name: "AK_User_NavigationId",
                table: "User");

            migrationBuilder.DropUniqueConstraint(
                name: "AK_SoftSkill_NavigationId",
                table: "SoftSkill");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddUniqueConstraint(
                name: "AK_User_NavigationId",
                table: "User",
                column: "NavigationId");

            migrationBuilder.AddUniqueConstraint(
                name: "AK_SoftSkill_NavigationId",
                table: "SoftSkill",
                column: "NavigationId");

            migrationBuilder.CreateTable(
                name: "UserCompetency",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    CompetencyId = table.Column<Guid>(type: "TEXT", nullable: false),
                    UserId = table.Column<Guid>(type: "TEXT", nullable: false),
                    Active = table.Column<bool>(type: "INTEGER", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "TEXT", nullable: false),
                    CreatedBy = table.Column<Guid>(type: "TEXT", nullable: false),
                    NavigationId = table.Column<Guid>(type: "TEXT", nullable: false),
                    Rating = table.Column<int>(type: "INTEGER", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "TEXT", nullable: true),
                    UpdatedBy = table.Column<Guid>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserCompetency", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserCompetency_Competency_CompetencyId",
                        column: x => x.CompetencyId,
                        principalTable: "Competency",
                        principalColumn: "NavigationId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_UserCompetency_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "NavigationId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "UserSoftSkill",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    SoftSkillId = table.Column<Guid>(type: "TEXT", nullable: false),
                    UserId = table.Column<Guid>(type: "TEXT", nullable: false),
                    Active = table.Column<bool>(type: "INTEGER", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "TEXT", nullable: false),
                    CreatedBy = table.Column<Guid>(type: "TEXT", nullable: false),
                    NavigationId = table.Column<Guid>(type: "TEXT", nullable: false),
                    Rating = table.Column<int>(type: "INTEGER", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "TEXT", nullable: true),
                    UpdatedBy = table.Column<Guid>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserSoftSkill", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserSoftSkill_SoftSkill_SoftSkillId",
                        column: x => x.SoftSkillId,
                        principalTable: "SoftSkill",
                        principalColumn: "NavigationId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_UserSoftSkill_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "NavigationId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserCompetency_CompetencyId",
                table: "UserCompetency",
                column: "CompetencyId");

            migrationBuilder.CreateIndex(
                name: "IX_UserCompetency_NavigationId",
                table: "UserCompetency",
                column: "NavigationId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_UserCompetency_UserId",
                table: "UserCompetency",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_UserSoftSkill_NavigationId",
                table: "UserSoftSkill",
                column: "NavigationId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_UserSoftSkill_SoftSkillId",
                table: "UserSoftSkill",
                column: "SoftSkillId");

            migrationBuilder.CreateIndex(
                name: "IX_UserSoftSkill_UserId",
                table: "UserSoftSkill",
                column: "UserId");
        }
    }
}
