
package com.application.heatmap.entities;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import javax.persistence.*;


@Entity
@Table(name = "car")
@Inheritance(strategy = InheritanceType.JOINED)
public class Car implements Serializable{
    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @OneToOne
    @JoinColumn(name = "brand", nullable = false, referencedColumnName = "id")
    private Brand brand;
    
    @Column(unique = true, nullable = false)
    private String model;
    
    @Column(nullable = false)
    private LocalDateTime fabricationYear;
       
    @Column(nullable = false)
    private Double engineLiters;
    
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private FuelType fuel;

    @OneToMany(mappedBy = "car", cascade = CascadeType.REMOVE)
    private List<Valuation> valuations;

    public Car(){}

    public Car(Long id, Brand brand, String model, LocalDateTime fabricationYear, Double engineLiters, FuelType fuel, List<Valuation> valuations) {
        this.id = id;
        this.brand = brand;
        this.model = model;
        this.fabricationYear = fabricationYear;
        this.engineLiters = engineLiters;
        this.fuel = fuel;
        this.valuations = valuations;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Brand getBrand() {
        return brand;
    }

    public void setBrand(Brand brand) {
        this.brand = brand;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public LocalDateTime getFabricationYear() {
        return fabricationYear;
    }

    public void setFabricationYear(LocalDateTime fabricationYear) {
        this.fabricationYear = fabricationYear;
    }

    public Double getEngineLiters() {
        return engineLiters;
    }

    public void setEngineLiters(Double engineLiters) {
        this.engineLiters = engineLiters;
    }

    public FuelType getFuel() {
        return fuel;
    }

    public void setFuel(FuelType fuel) {
        this.fuel = fuel;
    }

    public List<Valuation> getValuations() {
        return valuations;
    }

    public void setValuations(List<Valuation> valuations) {
        this.valuations = valuations;
    }

    @Override
    public int hashCode() {
        int hash = 5;
        hash = 89 * hash + Objects.hashCode(this.id);
        hash = 89 * hash + Objects.hashCode(this.model);
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final Car other = (Car) obj;
        if (!Objects.equals(this.model, other.model)) {
            return false;
        }
        if (!Objects.equals(this.id, other.id)) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "Car{" + "brand=" + brand + ", model=" + model + ", fabricationYear=" + fabricationYear + ", engineLiters=" + engineLiters + ", fuel=" + fuel + ", valuations=" + valuations + '}';
    }
}
