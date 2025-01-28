using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace vizsgabackend.Models;

public partial class NyelvbazisContext : DbContext
{
    public NyelvbazisContext()
    {
    }

    public NyelvbazisContext(DbContextOptions<NyelvbazisContext> options)
        : base(options)
    {
    }

    public virtual DbSet<MondatokMagyar> MondatokMagyars { get; set; }

    public virtual DbSet<MondatokSpanyol> MondatokSpanyols { get; set; }

    public virtual DbSet<Profil> Profils { get; set; }

    public virtual DbSet<SzavakMagyar> SzavakMagyars { get; set; }

    public virtual DbSet<SzavakSpanyol> SzavakSpanyols { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseMySQL("SERVER=localhost;PORT=3306;DATABASE=nyelvbazis;USER=root;PASSWORD=;SSL MODE=none;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<MondatokMagyar>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("mondatok_magyar");

            entity.Property(e => e.Id).HasColumnType("int(11)");
            entity.Property(e => e.MagyarMondatok)
                .HasMaxLength(50)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("magyar_mondatok");
        });

        modelBuilder.Entity<MondatokSpanyol>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("mondatok_spanyol");

            entity.Property(e => e.Id)
                .ValueGeneratedOnAdd()
                .HasColumnType("int(11)");
            entity.Property(e => e.SpanyolMondatok)
                .HasMaxLength(50)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("spanyol_mondatok");

            entity.HasOne(d => d.IdNavigation).WithOne(p => p.MondatokSpanyol)
                .HasForeignKey<MondatokSpanyol>(d => d.Id)
                .HasConstraintName("mondatok_spanyol_ibfk_1");
        });

        modelBuilder.Entity<Profil>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("profil");

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.Email)
                .HasMaxLength(50)
                .HasColumnName("email");
            entity.Property(e => e.Jelszo)
                .HasMaxLength(32)
                .HasColumnName("jelszo");
            entity.Property(e => e.Nev)
                .HasMaxLength(32)
                .HasColumnName("nev");
            entity.Property(e => e.Pontszam)
                .HasColumnType("int(11)")
                .HasColumnName("pontszam");
        });

        modelBuilder.Entity<SzavakMagyar>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("szavak_magyar");

            entity.Property(e => e.Id)
                .ValueGeneratedOnAdd()
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.MagyarSzo)
                .HasMaxLength(32)
                .HasColumnName("magyar_szo");

            entity.HasOne(d => d.IdNavigation).WithOne(p => p.SzavakMagyar)
                .HasForeignKey<SzavakMagyar>(d => d.Id)
                .HasConstraintName("szavak_magyar_ibfk_1");
        });

        modelBuilder.Entity<SzavakSpanyol>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("szavak_spanyol");

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.SpanyolSzo)
                .HasMaxLength(32)
                .HasColumnName("spanyol_szo");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
