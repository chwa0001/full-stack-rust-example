use actix_web::{web, HttpResponse, Responder};
use serde::{Deserialize, Serialize};
use serde_json::json;
use gemini_rs::Conversation;
use std::env;
use shuttle_runtime::SecretStore;

#[derive(Deserialize)]
struct InputData {
    action: String,
    text: String,
}

#[derive(Serialize)]
struct ResponseData {
    message: String,
}

/// API endpoint: Accepts a JSON body, sends it to Gemini AI via gemini-rs, and returns modified text
async fn replaced_text(
    data: web::Json<InputData>,
    secret_store: web::Data<SecretStore>,
) -> impl Responder {
    let api_key = match secret_store.get("GEMINI_API_KEY") {
        Some(key) => key.clone(), // Clone the API key for use
        None => {
            println!("❌ GEMINI_API_KEY is Missing!");
            return HttpResponse::InternalServerError().json(ResponseData {
                message: "Missing API Key".to_string(),
            });
        }
    };
    let mut convo = Conversation::new(api_key, "gemini-2.0-flash".to_string());

    let prompt = format!("Perform the following action: {} the following text without any preamble or explanations: {}",data.action, data.text);

    let response = convo.prompt(&prompt).await;
    HttpResponse::Ok().json(ResponseData { message: response })
}

/// Register user routes
pub fn config(cfg: &mut web::ServiceConfig, secret_store: web::Data<SecretStore>) {
  cfg.app_data(secret_store.clone())
  .service(
      web::scope("/api")
          .route("post/aipoweredtext", web::post().to(replaced_text))  // POST /api/post/aipoweredtext
  );
}