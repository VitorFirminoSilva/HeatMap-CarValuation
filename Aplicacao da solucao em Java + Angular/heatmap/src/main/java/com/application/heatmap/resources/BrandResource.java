package com.application.heatmap.resources;

import com.application.heatmap.entities.Brand;
import com.application.heatmap.repositories.BrandRepository;
import java.util.List;
import java.util.NoSuchElementException;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/brands")
public class BrandResource {
    
    @Autowired
    private BrandRepository brandRepository;
    
    @GetMapping
    public ResponseEntity<List<Brand>> findAll() {
        List<Brand> brands = brandRepository.findAll();
        return ResponseEntity.ok().body(brands);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Brand> findById(@PathVariable Long id) {
        try{
            Brand brand = brandRepository.findById(id).get();
            return ResponseEntity.status(201).body(brand);
        }catch(NoSuchElementException err){
            return ResponseEntity.status(404).body(new Brand());
        } 
    }
    
    @PostMapping
    public ResponseEntity<String> create(@RequestBody Brand brand){
        try{
            brandRepository.save(brand);
            return ResponseEntity.status(201).body("Success in create brand");
        }catch(Exception ex){
            
            if(ex instanceof ConstraintViolationException){
                return ResponseEntity.status(401).body("Erro in create brand - name duplicate"); 
            }
            
            return ResponseEntity.status(500).body("Erro - unhandled error (" + ex.getMessage() + ")"); 
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Brand> edit(@RequestBody Brand newBrand, @PathVariable Long id){
        
        return ResponseEntity.status(201).body(
                brandRepository.findById(id)
                    .map(brand -> {
                        brand.setBrandName(newBrand.getBrandName());
                        brand.setDescription(newBrand.getDescription());
                        return brandRepository.save(brand);
                    })
                    .orElseGet(() -> {
                      return brandRepository.save(newBrand);
                    })
        );
  
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id){
        
        if(brandRepository.existsById(id)){
           Brand brand = brandRepository.findById(id).get();
           brandRepository.delete(brand);
           return ResponseEntity.status(201).body("Success Delete"); 
        }else{
            return ResponseEntity.status(404).body("ERR): Brand for ID = " + id + "not found");
        }
    }
}
