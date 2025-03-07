package funding.startreum;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController  // ✅ RestController로 변경
@RequestMapping("/api")  // ✅ 모든 API 요청을 /api 경로로 시작하도록 설정
public class MainController {

    @GetMapping("/")
    public String showMainPage() {
        return "Spring Boot API is running!";
    }
}
