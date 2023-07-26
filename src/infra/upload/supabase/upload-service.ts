import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import { randomUUID } from 'crypto';

@Injectable()
export class UploadService {
  async execute(file: Express.Multer.File) {
    const supabaseKEY = process.env.SUPABASE_KEY;
    const supabaseUrl = 'https://lddhholltgdxyedxsmxj.supabase.co';

    const supabase = createClient(supabaseUrl, supabaseKEY, {
      auth: {
        persistSession: false,
      },
    });

    const filename = randomUUID();

    await supabase.storage.from('kudika').upload(filename, file.buffer);

    const r = supabase.from('kudika').select('*');

    return r;
  }
}
