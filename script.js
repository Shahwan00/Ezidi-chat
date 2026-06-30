// قاعدة بيانات الردود باللغة الإيزيدية (الكرمنجية بالخط اللاتيني المعتمد)
const ezidiResponses = {
    "silav": "Silav û rêz! Tu çawa yî? Ez hêvî dikim tu her dem baş bî.",
    "roj baş": "Roj baş û her dem xweş! Xwedê û Tawisî Melek li te bin.",
    "çawa yî": "Ez fêm dikim û ez pir baş im, spas ji bo pirsiyara te! Tu çawa yî?",
    "spas": "Ser çavan, tu her dem silamat bî.",
    "xwedê": "Xwedê li we û li hemû dinyayê be, xêr û fedyletê bide we.",
    "tawisî melek": "Tawisî Melek rêber û parêzvanê me teva be.",
    "laleş": "Laleşa Nûranî cihê pîroz û qibleta dilê me ye. Her dem pîroz be.",
    "ezidi": "Êzîdîtî dînê aştî, ronahî û hezkirinê ye."
};

// الرد الافتراضي في حال لم يفهم البوت الكلمة أو تمت كتابة لغة أخرى
const defaultResponse = "Ez lêborîna xwe dixwazim, ez hîn fêr dibim. Lê ez tenê bi zimanê êzîdî yê pîroz dikarim bersivê bidim te.";

// دالة إرسال ومعالجة الرسالة
function sendMessage() {
    const inputElement = document.getElementById("userInput");
    const messageText = inputElement.value.trim();

    // إذا كان الحقل فارغاً لا تفعل شيئاً
    if (messageText === "") return;

    // 1. عرض رسالة المستخدم في الشات
    appendMessage(messageText, "user-message");
    inputElement.value = ""; // تفريغ صندوق الإدخال

    // 2. محاكاة التفكير والرد بعد ثانية واحدة
    setTimeout(() => {
        const botReply = getBotResponse(messageText);
        appendMessage(botReply, "bot-message");
    }, 1000);
}

// دالة فحص النص وإرجاع الرد الإيزيدي المناسب
function getBotResponse(text) {
    const lowerText = text.toLowerCase();
    
    // البحث في قاعدة البيانات عن الكلمات المفتاحية
    for (let key in ezidiResponses) {
        if (lowerText.includes(key)) {
            return ezidiResponses[key];
        }
    }
    return defaultResponse;
}

// دالة بناء عنصر الـ HTML الخاص بالرسالة وإضافته للشاشة
function appendMessage(text, className) {
    const chatMessages = document.getElementById("chatMessages");
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", className);
    messageDiv.innerText = text;
    
    chatMessages.appendChild(messageDiv);
    
    // التمرير التلقائي لأسفل الشات عند وصول رسائل جديدة
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// تفعيل الإرسال عند الضغط على زر Enter من لوحة المفاتيح
function handleKeyPress(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}

