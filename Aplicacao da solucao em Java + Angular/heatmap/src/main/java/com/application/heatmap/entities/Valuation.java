package com.application.heatmap.entities;

import java.io.Serializable;
import java.util.Date;
import java.util.Objects;
import javax.persistence.*;

@Entity
@Table(name = "carValuation", uniqueConstraints = {
    @UniqueConstraint(name = "unique_valuationDate", columnNames = "dateValuation"),
})
public class Valuation implements Serializable{
    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "dateValuation", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date dateValuation;
    
    @Column(name = "value", nullable = false)
    private Double value;
    
    @ManyToOne
    @JoinColumn(name = "car", nullable = false, referencedColumnName = "id")
    private Car car;
    
    public Valuation(){}

    public Valuation(Long id, Date dateValuation, Double value, Car car) {
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

    public Date getDateValuation() {
        return dateValuation;
    }

    public void setDateValuation(Date dateValuation) {
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
}
