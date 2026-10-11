{{-- Plain HTML email sent to ISNAD_FORMS_NOTIFY_EMAIL for each new inquiry. --}}
<!DOCTYPE html>
<html lang="en">
<body style="font-family: Arial, sans-serif; color: #15211f; line-height: 1.5;">
    <h2 style="margin: 0 0 16px;">{{ $inquiry->subjectLine() }}</h2>
    <table cellpadding="0" cellspacing="0" style="font-size: 14px;">
        @foreach ($inquiry->displayFields() as $label => $value)
            <tr>
                <td style="padding: 6px 16px 6px 0; color: #626c6a; vertical-align: top; white-space: nowrap;">{{ $label }}</td>
                <td style="padding: 6px 0; white-space: pre-wrap;">{{ $value }}</td>
            </tr>
        @endforeach
    </table>
    <p style="color: #999; font-size: 12px; margin-top: 24px;">Received {{ $inquiry->created_at?->toDayDateTimeString() }} (UTC) via the ISNAD website. Reply directly to this email to answer the sender.</p>
</body>
</html>
