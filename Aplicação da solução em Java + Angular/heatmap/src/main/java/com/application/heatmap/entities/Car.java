
package com.application.heatmap.entities;

import java.io.Serializable;
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
    
    @Column(name = "brand", nullable = false)
    private String brand;
    
    @Column(name = "model", nullable = false)
    private String model;
    
    @Column(name = "fabricationYear", nullable = false)
    private Date fabricationYear;
    
    @Column(name = "engineLiters", nullable = false)
    private Double engineLiters;
    
    @Column(name = "fuel", nullable = false)
    private FuelType fuel;
    
    @OneToMany(cascade = CascadeType.ALL)
    private List<Valuation> valuations;

    public Car(){}

    public Car(Long id, String brand, String model, Date fabricationYear, Double engineLiters, FuelType fuel, List<Valuation> valuations) {
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

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public Date getFabricationYear() {
        return fabricationYear;
    }

    public void setFabricationYear(Date fabricationYear) {
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
        int hash = 7;
        hash = 89 * hash + Objects.hashCode(this.id);
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
        if (!Objects.equals(this.id, other.id)) {
            return false;
        }
        return true;
    } 
}
