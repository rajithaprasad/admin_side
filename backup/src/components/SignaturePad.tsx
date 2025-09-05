import { useRef, useImperativeHandle, forwardRef } from "react";
import SignatureCanvas from "react-signature-canvas";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eraser } from "lucide-react";

interface SignaturePadProps {
  onSignatureChange?: (signature: string) => void;
}

export interface SignaturePadRef {
  clear: () => void;
  getSignature: () => string;
  isEmpty: () => boolean;
}

export const SignaturePad = forwardRef<SignaturePadRef, SignaturePadProps>(
  ({ onSignatureChange }, ref) => {
    const signatureRef = useRef<SignatureCanvas>(null);

    useImperativeHandle(ref, () => ({
      clear: () => {
        signatureRef.current?.clear();
        onSignatureChange?.("");
      },
      getSignature: () => {
        return signatureRef.current?.getTrimmedCanvas().toDataURL() || "";
      },
      isEmpty: () => {
        return signatureRef.current?.isEmpty() || true;
      },
    }));

    const handleSignatureEnd = () => {
      const signature = signatureRef.current?.getTrimmedCanvas().toDataURL() || "";
      onSignatureChange?.(signature);
    };

    const handleClear = () => {
      signatureRef.current?.clear();
      onSignatureChange?.("");
    };

    return (
      <Card className="w-full">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Customer Signature</CardTitle>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleClear}
              className="flex items-center gap-2"
            >
              <Eraser className="w-4 h-4" />
              Clear
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border border-border rounded-lg overflow-hidden bg-background">
            <SignatureCanvas
              ref={signatureRef}
              canvasProps={{
                width: 400,
                height: 200,
                className: "signature-canvas w-full h-full",
                style: { width: "100%", height: "200px" },
              }}
              backgroundColor="rgb(255, 255, 255)"
              penColor="rgb(0, 0, 0)"
              onEnd={handleSignatureEnd}
            />
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Please sign above to confirm delivery
          </p>
        </CardContent>
      </Card>
    );
  }
);

SignaturePad.displayName = "SignaturePad";