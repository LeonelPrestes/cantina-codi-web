import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { SignInDialog } from "./sign-in-dialog"
import { SignUpDialog } from "./sign-up-dialog"

export function Login() {
    return (
        <div>
             <h2 className="text-xl font-semibold text-zinc-100">Faça seu login</h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                size="sm"
                className="bg-violet-400 hover:bg-violet-500 text-white cursor-pointer"
              >
                Login
              </Button>
            </DialogTrigger>

            <DialogContent className="dark border border-gray-800/30">
              <Tabs className="dark">
                <TabsList className="mb-4  border-b border-gray-800">
                  <TabsTrigger value="sign-in">Login</TabsTrigger>
                  <TabsTrigger value="sign-up">Cadastrar</TabsTrigger>
                </TabsList>

                <TabsContent value="sign-in">
                  <SignInDialog />
                </TabsContent>

                <TabsContent value="sign-up">
                  <SignUpDialog />
                </TabsContent>
              </Tabs>
            </DialogContent>
          </Dialog>
        </div>
    )
}