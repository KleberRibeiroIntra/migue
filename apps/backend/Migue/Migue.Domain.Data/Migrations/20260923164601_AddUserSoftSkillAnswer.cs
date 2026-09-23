using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migue.Domain.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddUserSoftSkillAnswer : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddUniqueConstraint(
                name: "AK_SoftSkillOption_NavigationId",
                table: "SoftSkillOption",
                column: "NavigationId");

            migrationBuilder.CreateTable(
                name: "UserSoftSkillAnswer",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    UserId = table.Column<Guid>(type: "TEXT", nullable: false),
                    SoftSkillId = table.Column<Guid>(type: "TEXT", nullable: false),
                    SoftSkillOptionId = table.Column<Guid>(type: "TEXT", nullable: false),
                    NavigationId = table.Column<Guid>(type: "TEXT", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "TEXT", nullable: false),
                    CreatedBy = table.Column<Guid>(type: "TEXT", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "TEXT", nullable: true),
                    UpdatedBy = table.Column<Guid>(type: "TEXT", nullable: true),
                    Active = table.Column<bool>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserSoftSkillAnswer", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserSoftSkillAnswer_SoftSkillOption_SoftSkillOptionId",
                        column: x => x.SoftSkillOptionId,
                        principalTable: "SoftSkillOption",
                        principalColumn: "NavigationId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_UserSoftSkillAnswer_SoftSkill_SoftSkillId",
                        column: x => x.SoftSkillId,
                        principalTable: "SoftSkill",
                        principalColumn: "NavigationId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_UserSoftSkillAnswer_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "NavigationId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserSoftSkillAnswer_NavigationId",
                table: "UserSoftSkillAnswer",
                column: "NavigationId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_UserSoftSkillAnswer_SoftSkillId",
                table: "UserSoftSkillAnswer",
                column: "SoftSkillId");

            migrationBuilder.CreateIndex(
                name: "IX_UserSoftSkillAnswer_SoftSkillOptionId",
                table: "UserSoftSkillAnswer",
                column: "SoftSkillOptionId");

            migrationBuilder.CreateIndex(
                name: "IX_UserSoftSkillAnswer_UserId_SoftSkillId_CreatedAt",
                table: "UserSoftSkillAnswer",
                columns: new[] { "UserId", "SoftSkillId", "CreatedAt" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserSoftSkillAnswer");

            migrationBuilder.DropUniqueConstraint(
                name: "AK_SoftSkillOption_NavigationId",
                table: "SoftSkillOption");
        }
    }
}
