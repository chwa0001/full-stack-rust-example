import {
  useState,
  useRef
} from 'react';
import {
  TextField,
  Box,
  Button,
  Menu,
  MenuItem,
  CircularProgress,
  Snackbar,
  Alert
} from "@mui/material";
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'

export default function Home() {
  const [text, setText] = useState("");
  const textFieldRef = useRef<HTMLTextAreaElement | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selection, setSelection] = useState<{ start: number; end: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Define multiple actions
  const actions = [
    { label: "Rephrase", value: "rephrase" },
    { label: "Summarize", value: "summarize" },
    { label: "Expand", value: "expand" }
  ];

  // Open dropdown when button is clicked
  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (textFieldRef.current) {
      const input = textFieldRef.current;
      const start = input.selectionStart;
      const end = input.selectionEnd;
      const selectedText = text.substring(start, end);

      if (selectedText) {
        setSelection({ start, end }); // Store selection
        setAnchorEl(event.currentTarget); // Open dropdown menu
      }
    }
  };

  // Call API to replace text with desired action
  const handleAction = async (action: string) => {
    if (selection) {
      const { start, end } = selection;
      const selectedText = text.substring(start, end);

      setAnchorEl(null); // Close menu
      setLoading(true); // Show loading

      try {
        // Send API request
        const response = await fetch("api/post/aipoweredtext", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: selectedText,action }),
        });

        if (!response.ok) throw new Error("Failed to fetch");

        const data = await response.json();
        const newText = data.message || selectedText; // Use API response or fallback

        // Restore selection after replacing text
        const updatedText = text.substring(0, start) + newText + text.substring(end);
        setText(updatedText);

        // Restore selection on replaced text
        setTimeout(() => {
          if (textFieldRef.current) {
            textFieldRef.current.focus();
            textFieldRef.current.setSelectionRange(start, start + newText.length);
          }
        }, 0);
      } catch (error) {
        console.error("API Error:", error);
        setError(`Failed to ${action} text. Please try again.`);

        // Keep the original selection intact
        setTimeout(() => {
          if (textFieldRef.current) {
            textFieldRef.current.focus();
            textFieldRef.current.setSelectionRange(start, end);
          }
        }, 5);
      } finally {
        setLoading(false); // Hide loading
      }
    }
  };

  return (
    <Box sx={{ width: "100%", maxWidth: "800px", margin: "auto", mt: 4 }}>
      <div>
        <a target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <TextField
        fullWidth
        multiline
        variant="outlined"
        value={text}
        onChange={(e) => setText(e.target.value)}
        inputRef={textFieldRef}
        placeholder="This is an editable paragraph. Type your sentences, select text and choose an action."
        sx={{
          fontSize: "1.2rem",
          "& .MuiInputBase-root": { padding: "16px" },
          "& .MuiOutlinedInput-input": { userSelect: "text" },
        }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpenMenu}
        sx={{ mt: 2 }}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : "Select Action"}
      </Button>

      {/* Dropdown Menu */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
        {actions.map((action) => (
          <MenuItem key={action.value} onClick={() => handleAction(action.value)}>
            {action.label}
          </MenuItem>
        ))}
      </Menu>

      {/* Error Snackbar */}
      <Snackbar open={Boolean(error)} autoHideDuration={3000} onClose={() => setError(null)}>
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
}

      