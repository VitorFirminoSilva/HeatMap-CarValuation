package com.application.heatmap.resources;

import com.application.heatmap.entities.Valuation;
import com.application.heatmap.repositories.ValuationRepository;
import java.util.List;
import java.util.NoSuchElementException;
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
@RequestMapping("/valuations")
public class ValuationResource {
    
    @Autowired
    private ValuationRepository valuationRepository;
    
    @GetMapping
    public ResponseEntity<List<Valuation>> findAll() {
        List<Valuation> valuations = valuationRepository.findAll();
        return ResponseEntity.ok().body(valuations);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Valuation> findById(@PathVariable Long id) {
        try{
            Valuation valuation = valuationRepository.findById(id).get();
            return ResponseEntity.status(201).body(valuation);
        }catch(NoSuchElementException err){
            return ResponseEntity.status(404).body(new Valuation());
        } 
    }
    
    @PostMapping("/")
    public ResponseEntity<Valuation> create(@RequestBody Valuation valuation){
        valuationRepository.save(valuation);
        return ResponseEntity.status(201).body(valuation);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Valuation> edit(@RequestBody Valuation newValuation, @PathVariable Long id){
        
        return ResponseEntity.status(201).body(
                valuationRepository.findById(id)
                    .map(valuation -> {
                        valuation.setCar(newValuation.getCar());
                        valuation.setDateValuation(newValuation.getDateValuation());
                        valuation.setValue(newValuation.getValue());
                        return valuationRepository.save(valuation);
                    })
                    .orElseGet(() -> {
                      return valuationRepository.save(newValuation);
                    })
        );
  
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id){
        
        if(valuationRepository.existsById(id)){
           Valuation valuation = valuationRepository.findById(id).get();
           valuationRepository.delete(valuation);
           return ResponseEntity.status(201).body("Success Delete"); 
        }else{
            return ResponseEntity.status(404).body("ERR): Valuation for ID = " + id + "not found");
        }
    }
}
