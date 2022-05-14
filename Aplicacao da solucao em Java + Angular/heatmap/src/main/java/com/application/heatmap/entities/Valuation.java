package com.application.heatmap.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Objects;
import javax.persistence.*;

@Entity
@Table(name = "carValuation")
public class Valuation implements Serializable{
    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "dateValuation", nullable = false)
    private LocalDateTime dateValuation;
    
    @Column(name = "value", nullable = false)
    private Double value;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @ManyToOne
    @JoinColumn(name = "car", nullable = false, referencedColumnName = "id")
    private Car car;
    
    public Valuation(){}

    public Valuation(Long id, LocalDateTime dateValuation, Double value, Car car) {
        this.id = id;
        this.dateValuation = dateValuation;
        this.value = value;
        this.car = car;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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

    @JsonIgnore
    public Car getCar() {
        return car;
    }

    public void setCar(Car car) {
        this.car = car;
    }

    @Override
    public int hashCode() {
        int hash = 5;
        hash = 37 * hash + Objects.hashCode(this.id);
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
        final Valuation other = (Valuation) obj;
        if (!Objects.equals(this.id, other.id)) {
            return false;
        }
        return true;
    }  

    @Override
    public String toString() {
        return "Valuation{dateValuation=" + dateValuation + ", value=" + value + ", car=" + car + '}';
    }
 
    /*public Integer findGreaterYear(List<Valuation> valuations){
        int greaterYear = 0;
        int tempYear;
        Calendar cal = Calendar.getInstance();

        for (Valuation valuation : valuations) {
            cal.setTime(valuation.getDateValuation());
            tempYear = cal.get(Calendar.YEAR);
            
            if(tempYear > greaterYear){
                greaterYear = tempYear;
            } 
        }

        return greaterYear;
    }*/
 

}
