import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ImageUploadProps {
  images: string[];
  onChange: (images: string[]) => void;
  folder: 'projects' | 'properties';
  maxImages?: number;
}

const ImageUpload = ({ images, onChange, folder, maxImages = 10 }: ImageUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const handleUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    if (images.length + files.length > maxImages) {
      toast({
        title: 'Limite de imagens',
        description: `Você pode adicionar no máximo ${maxImages} imagens.`,
        variant: 'destructive',
      });
      return;
    }

    setUploading(true);
    const newImages: string[] = [];

    try {
      for (const file of Array.from(files)) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('property-images')
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from('property-images')
          .getPublicUrl(fileName);

        newImages.push(urlData.publicUrl);
      }

      onChange([...images, ...newImages]);
      toast({
        title: 'Upload concluído',
        description: `${newImages.length} imagem(ns) adicionada(s) com sucesso.`,
      });
    } catch (error: any) {
      toast({
        title: 'Erro no upload',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setUploading(false);
    }
  }, [images, onChange, folder, maxImages, toast]);

  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    onChange(newImages);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <label className="cursor-pointer">
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleUpload}
            className="hidden"
            disabled={uploading}
          />
          <Button type="button" variant="outline" disabled={uploading} asChild>
            <span>
              {uploading ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Upload className="h-4 w-4 mr-2" />
              )}
              Adicionar Imagens
            </span>
          </Button>
        </label>
        <span className="text-sm text-muted-foreground">
          {images.length}/{maxImages} imagens
        </span>
      </div>

      {images.length === 0 ? (
        <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
          <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
          <p className="text-muted-foreground">Nenhuma imagem adicionada</p>
          <p className="text-xs text-muted-foreground mt-1">
            Clique em "Adicionar Imagens" para fazer upload
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((url, index) => (
            <div key={index} className="relative group aspect-video">
              <img
                src={url}
                alt={`Imagem ${index + 1}`}
                className="w-full h-full object-cover rounded-lg border border-border"
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => removeImage(index)}
              >
                <X className="h-4 w-4" />
              </Button>
              {index === 0 && (
                <span className="absolute bottom-2 left-2 text-xs bg-primary text-primary-foreground px-2 py-1 rounded">
                  Principal
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
