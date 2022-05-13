package com.application.heatmap.dtos;

import com.application.heatmap.entities.Car;
import java.time.LocalDateTime;
import javax.validation.constraints.NotBlank;

public class ValuationDTO {
    
    @NotBlank
    private LocalDateTime dateValuation;
    
    @NotBlank
    private Double value;

    @NotBlank
    private Car car;

    public LocalDateTime getDateValuation() {
        return dateValuation;
    }

    public void setDateValuation(LocalDateTime dateValuation) {
        this.dateValuation = dateValuation;
    }

    public Double getValue() {
        return value;
    }

    public void setValue(Double value) {
        this.value = value;
    }

    public Car getCar() {
        return car;
    }

    public void setCar(Car car) {
        this.car = car;
    }
}
