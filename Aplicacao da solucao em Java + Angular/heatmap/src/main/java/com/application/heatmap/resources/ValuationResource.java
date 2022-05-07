package com.application.heatmap.resources;

import com.application.heatmap.entities.Valuation;
import com.application.heatmap.repositories.CarRepository;
import com.application.heatmap.repositories.ValuationRepository;
import com.application.heatmap.util.InvalidRangeDate;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.TimeZone;
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
@RequestMapping("/valuations")
public class ValuationResource {
    
    @Autowired
    private ValuationRepository valuationRepository;
    
    @Autowired
    private CarRepository carRepository;
    
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
    
    @PostMapping()
    public ResponseEntity<String> create(@RequestBody Valuation valuation){

        
        
        Calendar cal = Calendar.getInstance();
        int tempYear;
        int bdYear;
        try{
            if(carRepository.existsById(valuation.getCar().getId())){
                List<Valuation> temp = carRepository.findById(valuation.getCar().getId()).get().getValuations();
            
                cal.setTime(valuation.getDateValuation());
                tempYear = cal.get(Calendar.YEAR);

                bdYear = valuation.findGreaterYear(temp);
                
                System.out.println(tempYear + " >= " + bdYear);
              
                if(bdYear <= tempYear){
                    valuationRepository.save(valuation);
                    return ResponseEntity.status(201).body("Success in create valuation"); 
                }else{
                    throw new InvalidRangeDate("Your Date must be greater than " + bdYear);
                }
            }else{
               throw new Exception();
            }
        }catch(Exception ex){
            if(ex instanceof InvalidRangeDate){
                return ResponseEntity.status(401).body("Erro in create valuation - " + ex.getMessage()); 
            }

         
            return ResponseEntity.status(500).body("Erro - unhandled error (" + ex.getMessage() + ")"); 
        }
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
