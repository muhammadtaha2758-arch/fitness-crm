<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddExerciseMetadataColumnsToVideoCatalogTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('video_catalog', function (Blueprint $table) {
            $table->text('exercise_instructions')->nullable()->after('targeted_muscle');
            $table->text('exercise_tips')->nullable()->after('exercise_instructions');
            $table->text('primary_activating_muscles')->nullable()->after('exercise_tips');
            $table->text('secondary_activating_muscles')->nullable()->after('primary_activating_muscles');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('video_catalog', function (Blueprint $table) {
            $table->dropColumn([
                'exercise_instructions',
                'exercise_tips',
                'primary_activating_muscles',
                'secondary_activating_muscles',
            ]);
        });
    }
}
