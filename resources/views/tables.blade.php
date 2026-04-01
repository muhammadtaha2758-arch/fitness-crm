<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tables</title>
    <!-- <link href="{{ asset('css/app.css') }}" rel="stylesheet"> Include any CSS you need -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script> <!-- jQuery CDN -->
</head>
<body>
    <div class="container mt-5">
        <h1>Tables</h1>
        <button id="new-table-btn" class="btn btn-primary mb-3">Add Table</button>
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>Table Name</th>
                    <th>Space</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody id="table-body">
                @foreach($tables as $table)
                <tr>
                    <td>{{ $table->tablename }}</td>
                    <td>{{ $table->space }}</td>
                    <td>
                        <button class="btn btn-success edit-btn" data-id="{{ $table->id }}">Edit</button>
                        <button class="btn btn-danger delete-btn" data-id="{{ $table->id }}">Delete</button>
                    </td>
                </tr>
                @endforeach
            </tbody>
        </table>
    </div>

    <!-- Modal for adding/editing tables -->
    <div id="table-modal" style="display: none;">
        <form id="table-form">
            <div>
                <label for="tablename">Table Name</label>
                <input type="text" id="tablename" name="tablename" required>
            </div>
            <div>
                <label for="space">Space</label>
                <input type="number" id="space" name="space" required>
            </div>
            <input type="hidden" id="table-id" name="id">
            <button type="submit" id="save-btn">Save</button>
        </form>
    </div>

    <script>
        $(document).ready(function () {
            // Create a new table
            $('#new-table-btn').click(function () {
                $('#table-id').val('');
                $('#tablename').val('');
                $('#space').val('');
                $('#table-modal').show();
            });

            // Edit table
            $('.edit-btn').click(function () {
                var id = $(this).data('id');
                // Fetch table data via AJAX and populate modal
                $.get('/tables/' + id, function (data) {
                    $('#table-id').val(data.id);
                    $('#tablename').val(data.tablename);
                    $('#space').val(data.space);
                    $('#table-modal').show();
                });
            });

            // Save table (create or update)
            $('#table-form').submit(function (event) {
                event.preventDefault();
                var id = $('#table-id').val();
                var url = id ? '/tables/' + id : '/tables';
                var method = id ? 'PUT' : 'POST';
                
                $.ajax({
                    url: url,
                    method: method,
                    data: $(this).serialize(),
                    success: function (response) {
                        // Refresh table after saving
                        location.reload();
                    }
                });
            });

            // Delete table
            $('.delete-btn').click(function () {
                var id = $(this).data('id');
                if (confirm('Are you sure you want to delete this table?')) {
                    $.ajax({
                        url: '/tables/' + id,
                        method: 'DELETE',
                        success: function () {
                            location.reload();
                        }
                    });
                }
            });
        });
    </script>
</body>
</html>