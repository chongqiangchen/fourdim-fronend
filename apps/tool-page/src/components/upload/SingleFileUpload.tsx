import { Box, BoxProps, Button } from "@mui/material";
import { ChangeEvent, useRef, useState } from "react";

interface Props extends BoxProps {
  accept?: string;
  buttonName?: string;
  onFileUpdate?: (file: File) => void;
}

export default function SingleFileUpload(props: Props) {
  const { accept, sx, buttonName = "上传文件", onFileUpdate, ...others } = props;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File>();

  const handleClick = () => {
    fileInputRef.current && fileInputRef.current.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    const singleFile = files && files.length > 0 && files[0];

    if (singleFile) {
      setFile(singleFile);
      onFileUpdate && onFileUpdate(singleFile);
    }
  };

  return (
    <Box
      sx={{
        display: "inline-block",
        ...sx
      }}
      {...others}
    >
      <Button variant="contained" onClick={handleClick}>
        {buttonName}
      </Button>
      <input
        type="file"
        accept={accept}
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </Box>
  );
}

