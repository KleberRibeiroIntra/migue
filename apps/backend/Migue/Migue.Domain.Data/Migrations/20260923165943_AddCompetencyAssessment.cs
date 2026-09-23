using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migue.Domain.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddCompetencyAssessment : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "CompetencyAssessmentId",
                table: "UserCompetencyAnswer",
                type: "TEXT",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateTable(
                name: "CompetencyAssessment",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    UserId = table.Column<Guid>(type: "TEXT", nullable: false),
                    Status = table.Column<int>(type: "INTEGER", nullable: false),
                    SubmittedAt = table.Column<DateTime>(type: "TEXT", nullable: true),
                    NavigationId = table.Column<Guid>(type: "TEXT", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "TEXT", nullable: false),
                    CreatedBy = table.Column<Guid>(type: "TEXT", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "TEXT", nullable: true),
                    UpdatedBy = table.Column<Guid>(type: "TEXT", nullable: true),
                    Active = table.Column<bool>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CompetencyAssessment", x => x.Id);
                    table.UniqueConstraint("AK_CompetencyAssessment_NavigationId", x => x.NavigationId);
                    table.ForeignKey(
                        name: "FK_CompetencyAssessment_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "NavigationId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserCompetencyAnswer_CompetencyAssessmentId_CompetencyQuestionId",
                table: "UserCompetencyAnswer",
                columns: new[] { "CompetencyAssessmentId", "CompetencyQuestionId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_CompetencyAssessment_NavigationId",
                table: "CompetencyAssessment",
                column: "NavigationId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_CompetencyAssessment_UserId_Status",
                table: "CompetencyAssessment",
                columns: new[] { "UserId", "Status" });

            migrationBuilder.AddForeignKey(
                name: "FK_UserCompetencyAnswer_CompetencyAssessment_CompetencyAssessmentId",
                table: "UserCompetencyAnswer",
                column: "CompetencyAssessmentId",
                principalTable: "CompetencyAssessment",
                principalColumn: "NavigationId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserCompetencyAnswer_CompetencyAssessment_CompetencyAssessmentId",
                table: "UserCompetencyAnswer");

            migrationBuilder.DropTable(
                name: "CompetencyAssessment");

            migrationBuilder.DropIndex(
                name: "IX_UserCompetencyAnswer_CompetencyAssessmentId_CompetencyQuestionId",
                table: "UserCompetencyAnswer");

            migrationBuilder.DropColumn(
                name: "CompetencyAssessmentId",
                table: "UserCompetencyAnswer");
        }
    }
}
