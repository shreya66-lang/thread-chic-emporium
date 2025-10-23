import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Ruler } from "lucide-react";

export const SizeGuide = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Ruler className="h-4 w-4" />
          Size Guide
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Size Guide</DialogTitle>
          <DialogDescription>
            Find your perfect fit with our detailed measurements
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-8 mt-6">
          {/* Sarees */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Sarees</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Size</th>
                    <th className="text-left py-3 px-4">Length</th>
                    <th className="text-left py-3 px-4">Width</th>
                    <th className="text-left py-3 px-4">Blouse Piece</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 px-4">Free Size</td>
                    <td className="py-3 px-4">5.5 meters</td>
                    <td className="py-3 px-4">1.2 meters</td>
                    <td className="py-3 px-4">0.8 meters</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Kurtas */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Kurtas</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Size</th>
                    <th className="text-left py-3 px-4">Bust (inches)</th>
                    <th className="text-left py-3 px-4">Length (inches)</th>
                    <th className="text-left py-3 px-4">Shoulder (inches)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">XS</td>
                    <td className="py-3 px-4">32-34</td>
                    <td className="py-3 px-4">38-40</td>
                    <td className="py-3 px-4">14</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">S</td>
                    <td className="py-3 px-4">34-36</td>
                    <td className="py-3 px-4">40-42</td>
                    <td className="py-3 px-4">15</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">M</td>
                    <td className="py-3 px-4">36-38</td>
                    <td className="py-3 px-4">42-44</td>
                    <td className="py-3 px-4">16</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">L</td>
                    <td className="py-3 px-4">38-40</td>
                    <td className="py-3 px-4">44-46</td>
                    <td className="py-3 px-4">17</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">XL</td>
                    <td className="py-3 px-4">40-42</td>
                    <td className="py-3 px-4">46-48</td>
                    <td className="py-3 px-4">18</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* How to Measure */}
          <div>
            <h3 className="font-semibold text-lg mb-4">How to Measure</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p><strong className="text-foreground">Bust:</strong> Measure around the fullest part of your bust, keeping the tape parallel to the floor.</p>
              <p><strong className="text-foreground">Length:</strong> Measure from the highest point of your shoulder down to your desired length.</p>
              <p><strong className="text-foreground">Shoulder:</strong> Measure from the edge of one shoulder to the edge of the other shoulder across your back.</p>
            </div>
          </div>

          {/* Care Instructions */}
          <div className="bg-secondary/30 rounded-lg p-6">
            <h3 className="font-semibold text-lg mb-3">Care Instructions for Khadi</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Hand wash in cold water with mild detergent</li>
              <li>• Avoid twisting or wringing the fabric</li>
              <li>• Dry in shade away from direct sunlight</li>
              <li>• Iron while slightly damp for best results</li>
              <li>• Store in a cool, dry place</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
