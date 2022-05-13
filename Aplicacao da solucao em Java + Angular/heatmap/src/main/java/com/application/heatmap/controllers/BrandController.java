package com.application.heatmap.controllers;

import com.application.heatmap.dtos.BrandDTO;
import com.application.heatmap.entities.Brand;
import com.application.heatmap.services.BrandService;
import java.util.List;
import java.util.Optional;
import javax.validation.Valid;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/brands")
public class BrandController {
    
    final BrandService brandService;
    
    public BrandController(BrandService brandService){
        this.brandService = brandService;
    }
    
    @GetMapping
    public ResponseEntity<List<Brand>> findAll() {
        return ResponseEntity.status(HttpStatus.OK).body(brandService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> findById(@PathVariable Long id) {
        Optional<Brand> brandOptional = brandService.findById(id);
        if(!brandOptional.isPresent()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Car Brand not found!");
        }
        return ResponseEntity.status(HttpStatus.OK).body(brandOptional.get());
    }
    
    @PostMapping
    public ResponseEntity<Object> create(@RequestBody @Valid BrandDTO brandDTO){
        if(brandService.existsByBrandName(brandDTO.getBrandName())){
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Conflict: Brand Name is already in use");
        }
        
        var brandModel = new Brand();
        BeanUtils.copyProperties(brandDTO, brandModel);
        return ResponseEntity.status(HttpStatus.CREATED).body(brandService.save(brandModel));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Object> edit(@PathVariable(value="id") Long id,
                                      @RequestBody @Valid BrandDTO brandDTO){
        Optional<Brand> brandOptional = brandService.findById(id);
        if(!brandOptional.isPresent()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Car Brand not found!");
        }
        
        if(brandService.existsByBrandName(brandDTO.getBrandName())){
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Conflict: Brand Name is already in use");
        }
        
        var updBrand = new Brand();
        BeanUtils.copyProperties(brandDTO, updBrand);
        updBrand.setId(brandOptional.get().getId());
        
        return ResponseEntity.status(HttpStatus.OK).body(brandService.save(updBrand));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> delete(@PathVariable(value="id") Long id){
        Optional<Brand> brandOptional = brandService.findById(id);
        if(!brandOptional.isPresent()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Car Brand not found!");
        }
        
        brandService.delete(brandOptional.get());
        return ResponseEntity.status(HttpStatus.OK).body("Brand deleted succesfully.");
        
    }
}
