<?php
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;

if (!Schema::hasColumn('stores', 'owner_name')) {
    Schema::table('stores', function (Blueprint $table) {
        $table->string('owner_name')->nullable()->after('name');
    });
    echo "Added owner_name column\n";
} else {
    echo "owner_name column already exists\n";
}
