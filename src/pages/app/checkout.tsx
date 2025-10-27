import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CardPayment } from "./components/card-payment";
import { PIX } from "./components/pix";

export function Checkout() {
  return (
    <div className="max-w-xl w-full mx-auto space-y-5 pb-10">
      <Card className="dark">
        <CardHeader>
          <CardTitle>Checkout</CardTitle>
          <CardDescription>Escolha o método de pagamento</CardDescription>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="card" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="card">Cartão de Crédito</TabsTrigger>
              <TabsTrigger value="pix">PIX</TabsTrigger>
            </TabsList>

            <TabsContent value="card" className="mt-4">
              <CardPayment />
            </TabsContent>

            <TabsContent value="pix" className="mt-4">
              <PIX
                pixCode="00020126580014br.gov.bcb.pix0136a629532e-7693-4846-852d-1bbff6b2f8cd520400005303986540510.005802BR5913Fulano de Tal6008BRASILIA62070503***63041D3D
"
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
