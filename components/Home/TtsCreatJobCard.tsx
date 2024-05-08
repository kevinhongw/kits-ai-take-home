import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import LoadingButton from '@/components/ui/LoadingButton';
import { isEmptyObject } from '@/lib/utils';
import { VoiceModel } from '@/types';

type Props = {
  voiceModels: VoiceModel[];
};

const formSchema = z.object({
  voiceModelId: z
    .string({
      required_error: 'Please select an voice model.',
    })
    .min(1, { message: 'Please select an voice model.' }),
  inputTtsText: z
    .string({
      required_error: 'Please enter text to convert.',
    })
    .min(8, { message: 'Must be at 8 or more characters long.' }),
});

const TtsCreatJobCard = ({ voiceModels }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { refresh } = useRouter();

  // TODO: display error messages
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      voiceModelId: '',
      inputTtsText: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/ttsJobs', {
        method: 'POST',
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Failed to submit the data. Please try again.');
      }
    } catch (error: any) {
      setError(error.message);
      console.error(error);
    } finally {
      setIsLoading(false);
      form.reset({
        voiceModelId: '',
        inputTtsText: '',
      });

      // reload page to fetch latest jobs
      refresh();
    }
  };

  const hasError = !isEmptyObject(form.formState.errors);

  return (
    <Card className="w-full max-w-md h-full">
      <CardHeader>
        <CardTitle>Text to speech</CardTitle>
        <CardDescription>
          Select a voice and provide text to generate speech
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <CardContent className="flex flex-col gap-8 py-0">
            <FormField
              control={form.control}
              name="voiceModelId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Voice model</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a voice" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      {voiceModels.map((voiceModel) => (
                        <SelectItem
                          key={voiceModel.id}
                          value={String(voiceModel.id)}
                        >
                          {voiceModel.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="inputTtsText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Input text</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Add text here"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-end">
            <LoadingButton
              loading={isLoading}
              disabled={hasError || isLoading}
              type="submit"
            >
              Convert
            </LoadingButton>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default TtsCreatJobCard;
