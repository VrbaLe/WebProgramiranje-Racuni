using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebTemplate.Migrations
{
    /// <inheritdoc />
    public partial class V1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "stanovi",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Ime = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Povrsina = table.Column<long>(type: "bigint", nullable: false),
                    BrClanova = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_stanovi", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "racuni",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RacunStanID = table.Column<int>(type: "int", nullable: true),
                    Mesec = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CenaStruje = table.Column<long>(type: "bigint", nullable: false),
                    CenaVode = table.Column<long>(type: "bigint", nullable: false),
                    CenaKomunalija = table.Column<long>(type: "bigint", nullable: false),
                    Placen = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_racuni", x => x.ID);
                    table.ForeignKey(
                        name: "FK_racuni_stanovi_RacunStanID",
                        column: x => x.RacunStanID,
                        principalTable: "stanovi",
                        principalColumn: "ID");
                });

            migrationBuilder.CreateIndex(
                name: "IX_racuni_RacunStanID",
                table: "racuni",
                column: "RacunStanID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "racuni");

            migrationBuilder.DropTable(
                name: "stanovi");
        }
    }
}
