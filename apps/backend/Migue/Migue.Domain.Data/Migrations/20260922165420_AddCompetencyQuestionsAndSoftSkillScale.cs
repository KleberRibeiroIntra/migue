using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migue.Domain.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddCompetencyQuestionsAndSoftSkillScale : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Activities_Projects_ProjectId",
                table: "Activities");

            migrationBuilder.DropForeignKey(
                name: "FK_UserCompetencies_Competencies_CompetencyId",
                table: "UserCompetencies");

            migrationBuilder.DropForeignKey(
                name: "FK_UserCompetencies_Users_UserId",
                table: "UserCompetencies");

            migrationBuilder.DropForeignKey(
                name: "FK_UserSoftSkills_SoftSkills_SoftSkillId",
                table: "UserSoftSkills");

            migrationBuilder.DropForeignKey(
                name: "FK_UserSoftSkills_Users_UserId",
                table: "UserSoftSkills");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserSoftSkills",
                table: "UserSoftSkills");

            migrationBuilder.DropUniqueConstraint(
                name: "AK_Users_NavigationId",
                table: "Users");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Users",
                table: "Users");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserCompetencies",
                table: "UserCompetencies");

            migrationBuilder.DropUniqueConstraint(
                name: "AK_SoftSkills_NavigationId",
                table: "SoftSkills");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SoftSkills",
                table: "SoftSkills");

            migrationBuilder.DropUniqueConstraint(
                name: "AK_Projects_NavigationId",
                table: "Projects");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Projects",
                table: "Projects");

            migrationBuilder.DropUniqueConstraint(
                name: "AK_Competencies_NavigationId",
                table: "Competencies");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Competencies",
                table: "Competencies");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Activities",
                table: "Activities");

            migrationBuilder.RenameTable(
                name: "UserSoftSkills",
                newName: "UserSoftSkill");

            migrationBuilder.RenameTable(
                name: "Users",
                newName: "User");

            migrationBuilder.RenameTable(
                name: "UserCompetencies",
                newName: "UserCompetency");

            migrationBuilder.RenameTable(
                name: "SoftSkills",
                newName: "SoftSkill");

            migrationBuilder.RenameTable(
                name: "Projects",
                newName: "Project");

            migrationBuilder.RenameTable(
                name: "Competencies",
                newName: "Competency");

            migrationBuilder.RenameTable(
                name: "Activities",
                newName: "Activity");

            migrationBuilder.RenameIndex(
                name: "IX_UserSoftSkills_UserId",
                table: "UserSoftSkill",
                newName: "IX_UserSoftSkill_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_UserSoftSkills_SoftSkillId",
                table: "UserSoftSkill",
                newName: "IX_UserSoftSkill_SoftSkillId");

            migrationBuilder.RenameIndex(
                name: "IX_UserSoftSkills_NavigationId",
                table: "UserSoftSkill",
                newName: "IX_UserSoftSkill_NavigationId");

            migrationBuilder.RenameIndex(
                name: "IX_Users_NavigationId",
                table: "User",
                newName: "IX_User_NavigationId");

            migrationBuilder.RenameIndex(
                name: "IX_UserCompetencies_UserId",
                table: "UserCompetency",
                newName: "IX_UserCompetency_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_UserCompetencies_NavigationId",
                table: "UserCompetency",
                newName: "IX_UserCompetency_NavigationId");

            migrationBuilder.RenameIndex(
                name: "IX_UserCompetencies_CompetencyId",
                table: "UserCompetency",
                newName: "IX_UserCompetency_CompetencyId");

            migrationBuilder.RenameIndex(
                name: "IX_SoftSkills_NavigationId",
                table: "SoftSkill",
                newName: "IX_SoftSkill_NavigationId");

            migrationBuilder.RenameIndex(
                name: "IX_Projects_NavigationId",
                table: "Project",
                newName: "IX_Project_NavigationId");

            migrationBuilder.RenameIndex(
                name: "IX_Competencies_NavigationId",
                table: "Competency",
                newName: "IX_Competency_NavigationId");

            migrationBuilder.RenameIndex(
                name: "IX_Activities_ProjectId",
                table: "Activity",
                newName: "IX_Activity_ProjectId");

            migrationBuilder.RenameIndex(
                name: "IX_Activities_NavigationId",
                table: "Activity",
                newName: "IX_Activity_NavigationId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserSoftSkill",
                table: "UserSoftSkill",
                column: "Id");

            migrationBuilder.AddUniqueConstraint(
                name: "AK_User_NavigationId",
                table: "User",
                column: "NavigationId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_User",
                table: "User",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserCompetency",
                table: "UserCompetency",
                column: "Id");

            migrationBuilder.AddUniqueConstraint(
                name: "AK_SoftSkill_NavigationId",
                table: "SoftSkill",
                column: "NavigationId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_SoftSkill",
                table: "SoftSkill",
                column: "Id");

            migrationBuilder.AddUniqueConstraint(
                name: "AK_Project_NavigationId",
                table: "Project",
                column: "NavigationId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Project",
                table: "Project",
                column: "Id");

            migrationBuilder.AddUniqueConstraint(
                name: "AK_Competency_NavigationId",
                table: "Competency",
                column: "NavigationId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Competency",
                table: "Competency",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Activity",
                table: "Activity",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "CompetencyQuestion",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    CompetencyId = table.Column<Guid>(type: "TEXT", nullable: false),
                    Text = table.Column<string>(type: "TEXT", nullable: false),
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
                    table.PrimaryKey("PK_CompetencyQuestion", x => x.Id);
                    table.UniqueConstraint("AK_CompetencyQuestion_NavigationId", x => x.NavigationId);
                    table.ForeignKey(
                        name: "FK_CompetencyQuestion_Competency_CompetencyId",
                        column: x => x.CompetencyId,
                        principalTable: "Competency",
                        principalColumn: "NavigationId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "SoftSkillScaleOption",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
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
                    table.PrimaryKey("PK_SoftSkillScaleOption", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CompetencyQuestionOption",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    CompetencyQuestionId = table.Column<Guid>(type: "TEXT", nullable: false),
                    Text = table.Column<string>(type: "TEXT", nullable: false),
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
                    table.PrimaryKey("PK_CompetencyQuestionOption", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CompetencyQuestionOption_CompetencyQuestion_CompetencyQuestionId",
                        column: x => x.CompetencyQuestionId,
                        principalTable: "CompetencyQuestion",
                        principalColumn: "NavigationId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CompetencyQuestion_CompetencyId",
                table: "CompetencyQuestion",
                column: "CompetencyId");

            migrationBuilder.CreateIndex(
                name: "IX_CompetencyQuestion_NavigationId",
                table: "CompetencyQuestion",
                column: "NavigationId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_CompetencyQuestionOption_CompetencyQuestionId",
                table: "CompetencyQuestionOption",
                column: "CompetencyQuestionId");

            migrationBuilder.CreateIndex(
                name: "IX_CompetencyQuestionOption_NavigationId",
                table: "CompetencyQuestionOption",
                column: "NavigationId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_SoftSkillScaleOption_NavigationId",
                table: "SoftSkillScaleOption",
                column: "NavigationId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Activity_Project_ProjectId",
                table: "Activity",
                column: "ProjectId",
                principalTable: "Project",
                principalColumn: "NavigationId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_UserCompetency_Competency_CompetencyId",
                table: "UserCompetency",
                column: "CompetencyId",
                principalTable: "Competency",
                principalColumn: "NavigationId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_UserCompetency_User_UserId",
                table: "UserCompetency",
                column: "UserId",
                principalTable: "User",
                principalColumn: "NavigationId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_UserSoftSkill_SoftSkill_SoftSkillId",
                table: "UserSoftSkill",
                column: "SoftSkillId",
                principalTable: "SoftSkill",
                principalColumn: "NavigationId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_UserSoftSkill_User_UserId",
                table: "UserSoftSkill",
                column: "UserId",
                principalTable: "User",
                principalColumn: "NavigationId",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Activity_Project_ProjectId",
                table: "Activity");

            migrationBuilder.DropForeignKey(
                name: "FK_UserCompetency_Competency_CompetencyId",
                table: "UserCompetency");

            migrationBuilder.DropForeignKey(
                name: "FK_UserCompetency_User_UserId",
                table: "UserCompetency");

            migrationBuilder.DropForeignKey(
                name: "FK_UserSoftSkill_SoftSkill_SoftSkillId",
                table: "UserSoftSkill");

            migrationBuilder.DropForeignKey(
                name: "FK_UserSoftSkill_User_UserId",
                table: "UserSoftSkill");

            migrationBuilder.DropTable(
                name: "CompetencyQuestionOption");

            migrationBuilder.DropTable(
                name: "SoftSkillScaleOption");

            migrationBuilder.DropTable(
                name: "CompetencyQuestion");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserSoftSkill",
                table: "UserSoftSkill");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserCompetency",
                table: "UserCompetency");

            migrationBuilder.DropUniqueConstraint(
                name: "AK_User_NavigationId",
                table: "User");

            migrationBuilder.DropPrimaryKey(
                name: "PK_User",
                table: "User");

            migrationBuilder.DropUniqueConstraint(
                name: "AK_SoftSkill_NavigationId",
                table: "SoftSkill");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SoftSkill",
                table: "SoftSkill");

            migrationBuilder.DropUniqueConstraint(
                name: "AK_Project_NavigationId",
                table: "Project");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Project",
                table: "Project");

            migrationBuilder.DropUniqueConstraint(
                name: "AK_Competency_NavigationId",
                table: "Competency");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Competency",
                table: "Competency");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Activity",
                table: "Activity");

            migrationBuilder.RenameTable(
                name: "UserSoftSkill",
                newName: "UserSoftSkills");

            migrationBuilder.RenameTable(
                name: "UserCompetency",
                newName: "UserCompetencies");

            migrationBuilder.RenameTable(
                name: "User",
                newName: "Users");

            migrationBuilder.RenameTable(
                name: "SoftSkill",
                newName: "SoftSkills");

            migrationBuilder.RenameTable(
                name: "Project",
                newName: "Projects");

            migrationBuilder.RenameTable(
                name: "Competency",
                newName: "Competencies");

            migrationBuilder.RenameTable(
                name: "Activity",
                newName: "Activities");

            migrationBuilder.RenameIndex(
                name: "IX_UserSoftSkill_UserId",
                table: "UserSoftSkills",
                newName: "IX_UserSoftSkills_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_UserSoftSkill_SoftSkillId",
                table: "UserSoftSkills",
                newName: "IX_UserSoftSkills_SoftSkillId");

            migrationBuilder.RenameIndex(
                name: "IX_UserSoftSkill_NavigationId",
                table: "UserSoftSkills",
                newName: "IX_UserSoftSkills_NavigationId");

            migrationBuilder.RenameIndex(
                name: "IX_UserCompetency_UserId",
                table: "UserCompetencies",
                newName: "IX_UserCompetencies_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_UserCompetency_NavigationId",
                table: "UserCompetencies",
                newName: "IX_UserCompetencies_NavigationId");

            migrationBuilder.RenameIndex(
                name: "IX_UserCompetency_CompetencyId",
                table: "UserCompetencies",
                newName: "IX_UserCompetencies_CompetencyId");

            migrationBuilder.RenameIndex(
                name: "IX_User_NavigationId",
                table: "Users",
                newName: "IX_Users_NavigationId");

            migrationBuilder.RenameIndex(
                name: "IX_SoftSkill_NavigationId",
                table: "SoftSkills",
                newName: "IX_SoftSkills_NavigationId");

            migrationBuilder.RenameIndex(
                name: "IX_Project_NavigationId",
                table: "Projects",
                newName: "IX_Projects_NavigationId");

            migrationBuilder.RenameIndex(
                name: "IX_Competency_NavigationId",
                table: "Competencies",
                newName: "IX_Competencies_NavigationId");

            migrationBuilder.RenameIndex(
                name: "IX_Activity_ProjectId",
                table: "Activities",
                newName: "IX_Activities_ProjectId");

            migrationBuilder.RenameIndex(
                name: "IX_Activity_NavigationId",
                table: "Activities",
                newName: "IX_Activities_NavigationId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserSoftSkills",
                table: "UserSoftSkills",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserCompetencies",
                table: "UserCompetencies",
                column: "Id");

            migrationBuilder.AddUniqueConstraint(
                name: "AK_Users_NavigationId",
                table: "Users",
                column: "NavigationId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Users",
                table: "Users",
                column: "Id");

            migrationBuilder.AddUniqueConstraint(
                name: "AK_SoftSkills_NavigationId",
                table: "SoftSkills",
                column: "NavigationId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_SoftSkills",
                table: "SoftSkills",
                column: "Id");

            migrationBuilder.AddUniqueConstraint(
                name: "AK_Projects_NavigationId",
                table: "Projects",
                column: "NavigationId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Projects",
                table: "Projects",
                column: "Id");

            migrationBuilder.AddUniqueConstraint(
                name: "AK_Competencies_NavigationId",
                table: "Competencies",
                column: "NavigationId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Competencies",
                table: "Competencies",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Activities",
                table: "Activities",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Activities_Projects_ProjectId",
                table: "Activities",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "NavigationId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_UserCompetencies_Competencies_CompetencyId",
                table: "UserCompetencies",
                column: "CompetencyId",
                principalTable: "Competencies",
                principalColumn: "NavigationId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_UserCompetencies_Users_UserId",
                table: "UserCompetencies",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "NavigationId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_UserSoftSkills_SoftSkills_SoftSkillId",
                table: "UserSoftSkills",
                column: "SoftSkillId",
                principalTable: "SoftSkills",
                principalColumn: "NavigationId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_UserSoftSkills_Users_UserId",
                table: "UserSoftSkills",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "NavigationId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
