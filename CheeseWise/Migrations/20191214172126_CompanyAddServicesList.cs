﻿using Microsoft.EntityFrameworkCore.Migrations;

namespace CheeseWise.Migrations
{
    public partial class CompanyAddServicesList : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Website",
                table: "Companies",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Website",
                table: "Companies");
        }
    }
}
