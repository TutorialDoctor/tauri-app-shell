// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! I hope you are having a wonderful day", name)
}

use tauri_plugin_opener::OpenerExt;

#[tauri::command]
fn open_url(app: tauri::AppHandle, url: String) -> Result<(), String> {
    app.opener()
        .open_url(url, None::<String>)
        .map_err(|e| e.to_string())
}

// Read a text file
use std::path::PathBuf;

#[tauri::command]
async fn read_text_file(path: PathBuf) -> Result<String, String> {
    // std::fs works, but it's "blind" to Tauri's security scopes
    // It will read any file the OS user has permission to see
    std::fs::read_to_string(&path).map_err(|e| e.to_string())
}

// Write a text file
#[tauri::command]
async fn write_text_file(path: String, contents: String) -> Result<(), String> {
    std::fs::write(path, contents).map_err(|e| e.to_string())
}

//Create a directory
#[tauri::command]
async fn create_directory(path: String) -> Result<(), String> {
    std::fs::create_dir_all(path).map_err(|e| e.to_string())
}

//List files in a directory
#[tauri::command]
async fn list_files(path: String) -> Result<Vec<String>, String> {
    let entries = std::fs::read_dir(path).map_err(|e| e.to_string())?;

    let mut files = Vec::new();

    for entry in entries {
        let entry = entry.map_err(|e| e.to_string())?;
        files.push(entry.path().display().to_string());
    }

    Ok(files)
}
use std::path::Path;

#[tauri::command]
async fn list_audio(path: String) -> Result<Vec<String>, String> {
    let entries = std::fs::read_dir(path).map_err(|e| e.to_string())?;

    let mut audio_files = Vec::new();

    for entry in entries {
        let entry = entry.map_err(|e| e.to_string())?;
        let path = entry.path();

        if path.is_file() {
            if let Some(ext) = path.extension() {
                let ext = ext.to_string_lossy().to_lowercase();

                if matches!(
                    ext.as_str(),
                    "mp3" | "wav" | "ogg" | "flac" | "m4a" | "aac" | "webm"
                ) {
                    audio_files.push(path.display().to_string());
                }
            }
        }
    }

    Ok(audio_files)
}

#[tauri::command]
async fn list_images(path: String) -> Result<Vec<String>, String> {
    let mut images = Vec::new();

    fn visit_dir(dir: &Path, images: &mut Vec<String>) -> Result<(), String> {
        let entries = std::fs::read_dir(dir).map_err(|e| e.to_string())?;

        for entry in entries {
            let entry = entry.map_err(|e| e.to_string())?;
            let path = entry.path();

            if path.is_dir() {
                // Recursively scan subdirectories
                visit_dir(&path, images)?;
            } else if let Some(ext) = path.extension() {
                let ext = ext.to_string_lossy().to_lowercase();

                // Supported image extensions
                if matches!(
                    ext.as_str(),
                    "png"
                        | "jpg"
                        | "jpeg"
                        | "gif"
                        | "webp"
                        | "bmp"
                        | "svg"
                        | "ico"
                        | "tif"
                        | "tiff"
                ) {
                    images.push(path.display().to_string());
                }
            }
        }

        Ok(())
    }

    visit_dir(Path::new(&path), &mut images)?;
    Ok(images)
}

// List files in a directory, including hidden files
#[tauri::command]
async fn list_hidden_files(path: String) -> Result<Vec<String>, String> {
    let entries = std::fs::read_dir(path).map_err(|e| e.to_string())?;

    let mut files = Vec::new();

    for entry in entries {
        let entry = entry.map_err(|e| e.to_string())?;

        // read_dir already returns hidden files (such as .gitignore, .DS_Store)
        // as long as the operating system allows access to them.
        files.push(entry.path().display().to_string());
    }

    Ok(files)
}

//Copy text to the clipboard
use tauri_plugin_clipboard_manager::ClipboardExt;

#[tauri::command]
fn copy_to_clipboard(app: tauri::AppHandle, text: String) -> Result<(), String> {
    app.clipboard().write_text(text).map_err(|e| e.to_string())
}

// Read clipboard text

#[tauri::command]
fn read_clipboard(app: tauri::AppHandle) -> Result<String, String> {
    app.clipboard().read_text().map_err(|e| e.to_string())
}
// save key value app settings
use tauri_plugin_store::StoreExt;

#[tauri::command]
fn save_setting(app: tauri::AppHandle, key: String, value: String) -> Result<(), String> {
    let store = app.store("settings.json").map_err(|e| e.to_string())?;

    store.set(key, serde_json::Value::String(value));

    store.save().map_err(|e| e.to_string())
}

// Load a setting

#[tauri::command]
fn load_setting(app: tauri::AppHandle, key: String) -> Result<Option<String>, String> {
    let store = app.store("settings.json").map_err(|e| e.to_string())?;

    let value = store.get(key);

    Ok(value.and_then(|v| v.as_str().map(|s| s.to_string())))
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_clipboard_manager::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_sql::Builder::new().build())
        .plugin(tauri_plugin_store::Builder::new().build())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_upload::init())
        .plugin(tauri_plugin_http::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            greet,
            read_text_file,
            write_text_file,
            create_directory,
            list_files,
            list_hidden_files,
            list_images,
            list_audio,
            copy_to_clipboard,
            read_clipboard,
            save_setting,
            load_setting,
            open_url
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
