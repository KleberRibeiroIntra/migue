using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migue.Domain.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddCompetencyScoringAndAnswerTiming : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "AnsweredAt",
                table: "UserCompetencyAnswer",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ChangeCount",
                table: "UserCompetencyAnswer",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Score",
                table: "CompetencyQuestionOption",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Signal",
                table: "CompetencyQuestionOption",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AnsweredAt",
                table: "UserCompetencyAnswer");

            migrationBuilder.DropColumn(
                name: "ChangeCount",
                table: "UserCompetencyAnswer");

            migrationBuilder.DropColumn(
                name: "Score",
                table: "CompetencyQuestionOption");

            migrationBuilder.DropColumn(
                name: "Signal",
                table: "CompetencyQuestionOption");
        }
    }
}
