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

export default function MessageInput(props: { onSubmit: (input: string) => void; isTyping: boolean }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const message = values.question.trim();
    props.onSubmit(message);
    form.reset();
  }

  return (
    <Form {...form}>
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
                    disabled={props.isTyping}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" variant="outline" size="icon" disabled={props.isTyping}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </Form>
  );
}
