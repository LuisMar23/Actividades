using API_SERVER_CEA.Modelo;
using Microsoft.EntityFrameworkCore;
using System;
using System.Data;

namespace API_SERVER_CEA.Context
{
    public class ApplicationContext : DbContext
    {
        public ApplicationContext(DbContextOptions options) : base(options)
        {

        }
        public DbSet<User> Usuario { get; set; }
        public DbSet<Persona> Persona { get; set; }
        public DbSet<Institucion> Institucion { get; set; }
        public DbSet<Visita> Visita { get; set; }
        public DbSet<ActivityModel> Activity { get; set; }
        public DbSet<ImagesModel> Images { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ImagesModel>().HasOne(h => h.Activity)
                .WithMany(P => P.Imagenes)
                .HasForeignKey(h => h.idActivity);
        }


        //protected override void OnModelCreating(ModelBuilder builder)
        //{
        //    builder.Entity<UserRole>().HasKey(x => new { x.UserId, x.RoleId });
        //    builder.Entity<InstitutionPerson>().HasKey(y => new { y.InstitutionId, y.PersonId });

        //    //Roles
        //    builder.Entity<UserRole>()
        //        .HasOne<Role>(x => x.Role)
        //        .WithMany(a => a.UsuariosRoles)
        //        .HasForeignKey(x => x.RoleId);
        //    //Usuarios
        //    builder.Entity<UserRole>()
        //     .HasOne<User>(x => x.User)
        //     .WithMany(a => a.UsuariosRoles)
        //     .HasForeignKey(x => x.UserId);

        //    //Instituciones
        //    builder.Entity<InstitutionPerson>()
        //       .HasOne<Institution>(x => x.Institucion)
        //       .WithMany(a => a.InstitucionPersona)
        //       .HasForeignKey(x => x.InstitutionId);
        //    //personas
        //    builder.Entity<InstitutionPerson>()
        //     .HasOne<Person>(x => x.Persona)
        //     .WithMany(a => a.InstitucionPersona)
        //     .HasForeignKey(x => x.PersonId);

        //}



    }
}