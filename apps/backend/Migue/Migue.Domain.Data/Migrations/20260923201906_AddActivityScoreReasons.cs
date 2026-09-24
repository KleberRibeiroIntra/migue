using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migue.Domain.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddActivityScoreReasons : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddUniqueConstraint(
                name: "AK_Activity_NavigationId",
                table: "Activity",
                column: "NavigationId");

            migrationBuilder.CreateTable(
                name: "ScoreReason",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Description = table.Column<string>(type: "TEXT", nullable: false),
                    Category = table.Column<int>(type: "INTEGER", nullable: false),
                    Sentiment = table.Column<int>(type: "INTEGER", nullable: false),
                    Order = table.Column<int>(type: "INTEGER", nullable: false),
                    RequiresComment = table.Column<bool>(type: "INTEGER", nullable: false),
                    NavigationId = table.Column<Guid>(type: "TEXT", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "TEXT", nullable: false),
                    CreatedBy = table.Column<Guid>(type: "TEXT", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "TEXT", nullable: true),
                    UpdatedBy = table.Column<Guid>(type: "TEXT", nullable: true),
                    Active = table.Column<bool>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ScoreReason", x => x.Id);
                    table.UniqueConstraint("AK_ScoreReason_NavigationId", x => x.NavigationId);
                });

            migrationBuilder.CreateTable(
                name: "ActivityScoreReason",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    ActivityId = table.Column<Guid>(type: "TEXT", nullable: false),
                    ScoreReasonId = table.Column<Guid>(type: "TEXT", nullable: false),
                    NavigationId = table.Column<Guid>(type: "TEXT", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "TEXT", nullable: false),
                    CreatedBy = table.Column<Guid>(type: "TEXT", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "TEXT", nullable: true),
                    UpdatedBy = table.Column<Guid>(type: "TEXT", nullable: true),
                    Active = table.Column<bool>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ActivityScoreReason", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ActivityScoreReason_Activity_ActivityId",
                        column: x => x.ActivityId,
                        principalTable: "Activity",
                        principalColumn: "NavigationId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ActivityScoreReason_ScoreReason_ScoreReasonId",
                        column: x => x.ScoreReasonId,
                        principalTable: "ScoreReason",
                        principalColumn: "NavigationId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ActivityScoreReason_ActivityId_ScoreReasonId",
                table: "ActivityScoreReason",
                columns: new[] { "ActivityId", "ScoreReasonId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_ActivityScoreReason_NavigationId",
                table: "ActivityScoreReason",
                column: "NavigationId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_ActivityScoreReason_ScoreReasonId",
                table: "ActivityScoreReason",
                column: "ScoreReasonId");

            migrationBuilder.CreateIndex(
                name: "IX_ScoreReason_NavigationId",
                table: "ScoreReason",
                column: "NavigationId",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ActivityScoreReason");

            migrationBuilder.DropTable(
                name: "ScoreReason");

            migrationBuilder.DropUniqueConstraint(
                name: "AK_Activity_NavigationId",
                table: "Activity");
        }
    }
}
