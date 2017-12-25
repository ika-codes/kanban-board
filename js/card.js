function Card(id, name) {
	var self = this;

	this.id = id;
	this.name = name || 'No name given';
	this.$element = createCard();

	function createCard() {
		var $card = $('<li>').addClass('card');
		var $cardDescription = $('<p>').addClass('card-description').text(self.name);
		var $cardDelete = $('<button>').addClass('btn-delete').html('<i class="fa fa-trash" aria-hidden="true"></i>');
		var $cardEdit = $('<button>').addClass('btn-edit').html('<i class="fa fa-pencil" aria-hidden="true"></i>');

		$cardDelete.on('click', function() {
			self.removeCard();
		});

		$cardEdit.on('click', function () {
			self.editCard();
		});

		$card.append($cardDelete)
			.append($cardEdit)
			.append($cardDescription);

		return $card;
	}
}

Card.prototype = {
	removeCard: function() {
		var self = this;
		$.ajax({
			url: baseUrl + '/card/' + self.id,
			method: 'DELETE',
			success: function(){
				self.$element.remove();
			}
		});
	},

	editCard: function() {
		var self = this;
		self.name = prompt('Edit your card:', self.name);
		$.ajax({
			url: baseUrl + '/card/' + self.id,
			method: 'PUT',
			data: {
				id: self.id,
				name: self.name,
				bootcamp_kanban_column_id: self.$element.parent().id
			},
			success: function(response) {
				$cardDescription.text(self.name);
			}
		});

	}
};