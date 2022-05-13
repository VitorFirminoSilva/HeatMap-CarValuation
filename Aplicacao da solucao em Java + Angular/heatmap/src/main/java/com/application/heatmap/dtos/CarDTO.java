package com.application.heatmap.dtos;

import com.application.heatmap.entities.Brand;
import com.application.heatmap.entities.FuelType;
import com.application.heatmap.entities.Valuation;
import java.time.LocalDateTime;
import java.util.List;
import javax.validation.constraints.NotBlank;

public class CarDTO {
    
    @NotBlank
    private Brand brand;
    
    @NotBlank
    private String model;

    @NotBlank
    private LocalDateTime fabricationYear;
       
    @NotBlank
    private Double engineLiters;
    
    @NotBlank
    private FuelType fuel;
    
    private List<Valuation> valuations;
    

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
    
}
