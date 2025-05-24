package com.example.aavc.login.kafka;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class KafkaConsumerService {

    @KafkaListener(topics= "user-events", groupId= "login-group")
    public void listen(String message){
        System.out.println("Kafka Consume:" +message);
    }
}
