<?php

namespace App\Console\Commands;

use App\Models\Inquiry;
use Illuminate\Console\Command;

/** php artisan isnad:inquiries          → latest 20 messages
 *  php artisan isnad:inquiries --show=5 → full text of message #5 */
class ListInquiries extends Command
{
    protected $signature = 'isnad:inquiries {--limit=20} {--show= : Show one message in full}';

    protected $description = 'List contact and partnership messages received through the website';

    public function handle(): int
    {
        if ($id = $this->option('show')) {
            $inquiry = Inquiry::find($id);
            if (! $inquiry) {
                $this->error("No message with id {$id}.");

                return self::FAILURE;
            }
            $this->info($inquiry->subjectLine());
            foreach ($inquiry->displayFields() as $label => $value) {
                $this->line("<comment>{$label}:</comment> {$value}");
            }
            $this->line('<comment>Received:</comment> '.$inquiry->created_at);

            return self::SUCCESS;
        }

        $rows = Inquiry::latest()->limit((int) $this->option('limit'))->get()
            ->map(fn (Inquiry $i) => [$i->id, $i->created_at->format('Y-m-d H:i'), $i->type, $i->name, $i->email, (string) str($i->message)->limit(50)]);

        if ($rows->isEmpty()) {
            $this->info('No messages yet.');

            return self::SUCCESS;
        }

        $this->table(['ID', 'Received', 'Type', 'Name', 'Email', 'Message'], $rows);
        $this->line('Use --show=ID to read a full message.');

        return self::SUCCESS;
    }
}
