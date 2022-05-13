package com.application.heatmap.dtos;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class BrandDTO {
   
    @NotBlank
    @Size(min=3, max=60)
    private String brandName;
    
    @NotBlank
    @Size(min = 10, max=2500)
    private String description;

    public String getBrandName() {
        return brandName;
    }

    public void setBrandName(String brandName) {
        this.brandName = brandName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
 
}
