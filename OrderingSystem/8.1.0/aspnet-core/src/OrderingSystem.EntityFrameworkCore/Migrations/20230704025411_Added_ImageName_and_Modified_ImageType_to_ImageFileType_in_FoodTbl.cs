using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OrderingSystem.Migrations
{
    /// <inheritdoc />
    public partial class Added_ImageName_and_Modified_ImageType_to_ImageFileType_in_FoodTbl : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ImageType",
                table: "Foods",
                newName: "ImageName");

            migrationBuilder.AddColumn<string>(
                name: "ImageFileType",
                table: "Foods",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImageFileType",
                table: "Foods");

            migrationBuilder.RenameColumn(
                name: "ImageName",
                table: "Foods",
                newName: "ImageType");
        }
    }
}
