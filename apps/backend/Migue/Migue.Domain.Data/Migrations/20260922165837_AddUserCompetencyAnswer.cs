using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migue.Domain.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddUserCompetencyAnswer : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddUniqueConstraint(
                name: "AK_User_NavigationId",
                table: "User",
                column: "NavigationId");

            migrationBuilder.AddUniqueConstraint(
                name: "AK_CompetencyQuestionOption_NavigationId",
                table: "CompetencyQuestionOption",
                column: "NavigationId");

            migrationBuilder.CreateTable(
                name: "UserCompetencyAnswer",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    UserId = table.Column<Guid>(type: "TEXT", nullable: false),
                    CompetencyQuestionId = table.Column<Guid>(type: "TEXT", nullable: false),
                    CompetencyQuestionOptionId = table.Column<Guid>(type: "TEXT", nullable: false),
                    NavigationId = table.Column<Guid>(type: "TEXT", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "TEXT", nullable: false),
                    CreatedBy = table.Column<Guid>(type: "TEXT", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "TEXT", nullable: true),
                    UpdatedBy = table.Column<Guid>(type: "TEXT", nullable: true),
                    Active = table.Column<bool>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserCompetencyAnswer", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserCompetencyAnswer_CompetencyQuestionOption_CompetencyQuestionOptionId",
                        column: x => x.CompetencyQuestionOptionId,
                        principalTable: "CompetencyQuestionOption",
                        principalColumn: "NavigationId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_UserCompetencyAnswer_CompetencyQuestion_CompetencyQuestionId",
                        column: x => x.CompetencyQuestionId,
                        principalTable: "CompetencyQuestion",
                        principalColumn: "NavigationId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_UserCompetencyAnswer_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "NavigationId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserCompetencyAnswer_CompetencyQuestionId",
                table: "UserCompetencyAnswer",
                column: "CompetencyQuestionId");

            migrationBuilder.CreateIndex(
                name: "IX_UserCompetencyAnswer_CompetencyQuestionOptionId",
                table: "UserCompetencyAnswer",
                column: "CompetencyQuestionOptionId");

            migrationBuilder.CreateIndex(
                name: "IX_UserCompetencyAnswer_NavigationId",
                table: "UserCompetencyAnswer",
                column: "NavigationId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_UserCompetencyAnswer_UserId",
                table: "UserCompetencyAnswer",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserCompetencyAnswer");

            migrationBuilder.DropUniqueConstraint(
                name: "AK_User_NavigationId",
                table: "User");

            migrationBuilder.DropUniqueConstraint(
                name: "AK_CompetencyQuestionOption_NavigationId",
                table: "CompetencyQuestionOption");
        }
    }
}
