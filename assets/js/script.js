document.addEventListener('DOMContentLoaded', async function () {
    // 加载配置文件
    const configResponse = await fetch('config.json');
    const config = await configResponse.json();

    // 预加载图像
    const preloadedImages = [
        'assets/img/music-note.png',
        'assets/img/music-note-paused.png'
    ];

    await Promise.all(preloadedImages.map(src => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = src;
            img.onload = resolve;
            img.onerror = reject;
        });
    }));


    // preloadedImages.forEach(src => {
    //     const img = new Image();
    //     img.src = src;
    // });

    const canvas = document.getElementById('heartCanvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const maxParticles = 300;
    let heartSize = 12;

    const messages = config.init_messages;

    const elements = {
        messageContainer: document.getElementById('messageContainer'),
        questionContainer: document.getElementById('questionContainer'),
        userMessageInput: document.getElementById('userMessageInput'),
        submitButton: document.getElementById('submitMessage'),
        loadingElement: document.getElementById('loading'),
        resultContainer: document.getElementById('result'),
        musicButton: document.getElementById('musicButton'),
        backgroundMusic: document.getElementById('backgroundMusic')
    };
    elements.backgroundMusic.src = config.background_music;

    let logs = [];

    elements.backgroundMusic.play().catch(error => {
        console.error('Music autoplay failed:', error);
    });

    elements.musicButton.addEventListener('click', toggleMusic);

    function toggleMusic() {
        if (elements.backgroundMusic.paused) {
            elements.backgroundMusic.play();
            elements.musicButton.classList.remove('paused');
            elements.musicButton.src = 'assets/img/music-note.png';
        } else {
            elements.backgroundMusic.pause();
            elements.musicButton.classList.add('paused');
            elements.musicButton.src = 'assets/img/music-note-paused.png';
        }
    }

    function displayMessages(messages, index = 0) {
        if (index < messages.length) {
            elements.messageContainer.textContent = messages[index];
            setTimeout(() => displayMessages(messages, index + 1), 2000);
        } else {
            elements.messageContainer.style.display = 'none';
            elements.questionContainer.style.display = 'block';
        }
    }

    elements.submitButton.addEventListener('click', handleSubmit);

    async function handleSubmit() {
        const userMessage = elements.userMessageInput.value.trim();
        if (userMessage) {
            elements.loadingElement.style.display = 'block';
            elements.resultContainer.innerHTML = '';
            const response = await getAIResponse(userMessage);
            const { sentence_emotion, reply } = JSON.parse(response);
            console.log('sentence_emotion',sentence_emotion)
            console.log('reply',reply)
            const coupon = getCoupon(sentence_emotion);

            elements.loadingElement.style.display = 'none';
            elements.resultContainer.innerHTML = `<p>${reply}</p><img src="${coupon}" alt="Love Coupon">`;

            heartSize = 10;
            canvas.style.transition = "transform 1s ease";
            canvas.style.transform = "scale(0.5) translateY(-400px)";

            const logEntry = {
                time: new Date().toISOString(),
                userMessage,
                modelReply: reply,
                coupon: coupon.split('/').pop()
            };
            logs.push(logEntry);
            sendLogsToServer(logEntry);
        }
    }

    function getCoupon(emotion) {
        const emotionKey = emotion.toLowerCase();
        console.log('emotionKey',emotionKey)
        console.log('config.coupons',config.coupons)
        const couponList = config.coupons[emotionKey] || config.coupons['neutral']; // Default to neutral if emotion not found
        if (!couponList) {
            console.error(`No coupons found for emotion: ${emotion}`);
            return config.coupons['neutral'][0]; // Return first neutral coupon as fallback
        }
        return couponList[Math.floor(Math.random() * couponList.length)];
    }

    async function getAIResponse(userMessage) {
        const prompt = config.user_msg_prompt;

        const response = await fetch(config.model_api_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${config.model_api_key}`
            },
            body: JSON.stringify({
                model: config.model_name,
                messages: [
                    { role: 'system', content: prompt },
                    { role: 'user', content: userMessage }
                ],
                temperature: 0,
                top_p: 0
            })
        });

        const data = await response.json();
        return data.choices[0].message.content;
    }

    function sendLogsToServer(logEntry) {
        fetch(config.model_log_server_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(logEntry)
        })
        .then(response => response.json())
        .then(data => console.log('Success:', data))
        .catch(error => console.error('Error:', error));
    }

    function Particle(x, y, size, speedX, speedY, color) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.speedX = speedX;
        this.speedY = speedY;
        this.color = color;

        this.update = function() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.size > 0.2) this.size -= 0.1;
        }

        this.draw = function() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        }
    }

    function createParticle() {
        const t = Math.random() * Math.PI * 2;
        const x = heartSize * 16 * Math.pow(Math.sin(t), 3);
        const y = -heartSize * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
        const size = Math.random() * 5 + 2;
        const speedX = (Math.random() - 0.5) * 2;
        const speedY = (Math.random() - 0.5) * 2;
        const color = 'rgba(255, 105, 180, 0.8)';

        particles.push(new Particle(canvas.width / 2 + x, canvas.height / 2 + y, size, speedX, speedY, color));
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach((particle, index) => {
            particle.update();
            particle.draw();
            if (particle.size <= 0.2) {
                particles.splice(index, 1);
            }
        });
        while (particles.length < maxParticles) {
            createParticle();
        }
        requestAnimationFrame(animate);
    }

    animate();
    displayMessages(messages);
});
