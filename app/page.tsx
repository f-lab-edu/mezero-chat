'use client';

import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  question: z.string().min(2).max(10000),
});

export default function Home() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    console.log('==========handleSubmit==========');
    console.log('서버에서 응답을 내려줍니다.');
  }

  return (
    <div className="grid h-screen w-full">
      <div className="flex flex-col">
        <Header />
        <main className="relative flex h-full min-h-[50vh] flex-col bg-white p-4 lg:col-span-2">
          <div className="flex-1 w-full max-w-2xl m-auto">
            <div className="space-y-4">
              {/* <div className="flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm ml-auto bg-primary text-primary-foreground">
                내가 질문한 내용입니다.
              </div>
              <div className="flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm mr-auto bg-muted">
                Chat이 답변한 내용입니다.
              </div> */}
            </div>
          </div>
        </main>
        <div className="sticky bottom-0 w-full py-2 border-t bg-white">
          <Form {...form}>
            <div className="max-w-2xl m-auto">
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex w-full items-center space-x-2">
                  <FormField
                    control={form.control}
                    name="question"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <Input
                            placeholder="질문을 입력하세요."
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' && e.nativeEvent.isComposing === false) {
                                form.handleSubmit(onSubmit);
                              }
                            }}
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <Button type="submit" variant="outline" size="icon">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </form>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
