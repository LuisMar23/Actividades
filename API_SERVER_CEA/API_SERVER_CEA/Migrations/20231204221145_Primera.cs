using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API_SERVER_CEA.Migrations
{
    public partial class Primera : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Activity",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nombre = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    objetivo = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    descripcion = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    lugar = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    fecha = table.Column<DateTime>(type: "datetime2", nullable: false),
                    estado = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Activity", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Institucion",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nombre = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Tipo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Estado = table.Column<byte>(type: "tinyint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Institucion", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Persona",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nombrePersona = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    apellidoPersona = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    edadPersona = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ciPersona = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    genero = table.Column<int>(type: "int", nullable: true),
                    celularPersona = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    barrio_zona = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    estadoPersona = table.Column<byte>(type: "tinyint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Persona", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Images",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ruta = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    estado = table.Column<int>(type: "int", nullable: false),
                    idActivity = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Images", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Images_Activity_idActivity",
                        column: x => x.idActivity,
                        principalTable: "Activity",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Usuario",
                columns: table => new
                {
                    idUsuario = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nombreUsuario = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    contraseniaUsuario = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    estadoUsuario = table.Column<int>(type: "int", nullable: false),
                    rolUsuario = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PersonaId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Usuario", x => x.idUsuario);
                    table.ForeignKey(
                        name: "FK_Usuario_Persona_PersonaId",
                        column: x => x.PersonaId,
                        principalTable: "Persona",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Visita",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    observaciones = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    tipo = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    estado = table.Column<int>(type: "int", nullable: false),
                    InstitucionId = table.Column<int>(type: "int", nullable: false),
                    ActividadId = table.Column<int>(type: "int", nullable: false),
                    PersonaId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Visita", x => x.id);
                    table.ForeignKey(
                        name: "FK_Visita_Activity_ActividadId",
                        column: x => x.ActividadId,
                        principalTable: "Activity",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Visita_Institucion_InstitucionId",
                        column: x => x.InstitucionId,
                        principalTable: "Institucion",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Visita_Persona_PersonaId",
                        column: x => x.PersonaId,
                        principalTable: "Persona",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Images_idActivity",
                table: "Images",
                column: "idActivity");

            migrationBuilder.CreateIndex(
                name: "IX_Usuario_PersonaId",
                table: "Usuario",
                column: "PersonaId");

            migrationBuilder.CreateIndex(
                name: "IX_Visita_ActividadId",
                table: "Visita",
                column: "ActividadId");

            migrationBuilder.CreateIndex(
                name: "IX_Visita_InstitucionId",
                table: "Visita",
                column: "InstitucionId");

            migrationBuilder.CreateIndex(
                name: "IX_Visita_PersonaId",
                table: "Visita",
                column: "PersonaId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Images");

            migrationBuilder.DropTable(
                name: "Usuario");

            migrationBuilder.DropTable(
                name: "Visita");

            migrationBuilder.DropTable(
                name: "Activity");

            migrationBuilder.DropTable(
                name: "Institucion");

            migrationBuilder.DropTable(
                name: "Persona");
        }
    }
}
