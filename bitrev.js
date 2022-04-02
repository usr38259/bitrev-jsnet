
import System
import System.Drawing
import System.Windows.Forms

var form, EventsInstance, options

function BitrevForm () {
	this.form = new Form
	this.form.Size = new Size (options.width, options.height)
	this.form.FormBorderStyle = FormBorderStyle.FixedSingle
	with (this.form) {
		Text = "Выбор файлов - изменение порядка бит"
		MaximizeBox = false
		AllowDrop = true
	}

	this.label1 = new Label
	with (this.label1) {
		Location = new Point (options.vspc, options.hspc)
		Text = "Входной файл:"
	}
	this.label1.Size = new Size (this.label1.PreferredSize.Width, this.label1.PreferredSize.Height)
	this.form.Controls.Add (this.label1)

	this.filebrowse1 = new Button
	with (this.filebrowse1) {
		Location = new Point (256, 24)
		Text = "Выбрать..."
		add_Click (EventsInstance.filebrowseClick)
	}
	this.filebrowse1.Size = new Size (options.button_width, options.button_height)
	this.form.Controls.Add (this.filebrowse1)

	this.textbox1 = new TextBox
   	this.textbox1.Location = new Point (options.vspc, 26)
	this.textbox1.Size = new Size (237, this.textbox1.PreferredSize.Height)
	this.form.Controls.Add (this.textbox1)

	this.checkbox = new CheckBox
	with (this.checkbox) {
		Location = new Point (options.vspc, 53)
		Text = "Выполнить на месте"
		Checked = false
		add_Click (EventsInstance.checkboxClick)
	}
	this.checkbox.Size = new Size (this.checkbox.PreferredSize.Width, this.checkbox.PreferredSize.Height)
	this.form.Controls.Add (this.checkbox)

	this.label2 = new Label
	with (this.label2) {
		Location = new Point (options.vspc, 78)
		Text = "Выходной файл:"
	}
	this.label2.Size = new Size (this.label2.PreferredSize.Width, this.label2.PreferredSize.Height)
	this.form.Controls.Add (this.label2)

	this.filebrowse2 = new Button
	with (this.filebrowse2) {
		Location = new Point (256, 93)
		Text = "Выбрать..."
		add_Click (EventsInstance.filesaveClick)
	}
	this.filebrowse2.Size = new Size (options.button_width, options.button_height)
	this.form.Controls.Add (this.filebrowse2)

	this.textbox2 = new TextBox
	this.textbox2.Location = new Point (options.vspc, 95)
	this.textbox2.Size = new Size (237, this.textbox2.PreferredSize.Width)
	this.form.Controls.Add (this.textbox2)

	this.button1 = new Button
	with (this.button1) {
		Location = new Point (174, 136)
		Text = "OK"
	}
	this.button1.Size = new Size (options.button_width, options.button_height)
	this.button1.DialogResult = DialogResult.OK
	this.form.Controls.Add (this.button1)

	this.button2 = new Button
	with (this.button2) {
		Location = new Point (256, 136)
		Text = "Отмена"
	}
	this.button2.Size = new Size (options.button_width, options.button_height)
	this.button2.DialogResult = DialogResult.Cancel
	this.form.Controls.Add (this.button2)

	this.Show = function () {
		this.form.ShowDialog ()
		return this.form.DialogResult
	}
}

class Events {
	function filebrowseClick (sender, e : EventArgs) {
		var ofdlg = new OpenFileDialog
		ofdlg.Filter = "Двоичные файлы (*.bin)|*.bin|Все файлы|*.*"
		ofdlg.FilterIndex = 2
		ofdlg.ShowDialog ()
		form.textbox1.Text = ofdlg.FileName
	}
	function filesaveClick (sender, e : EventArgs) {
		var sfdlg = new SaveFileDialog
		sfdlg.Filter = "Двоичные файлы (*.bin)|*.bin|Все файлы|*.*"
		sfdlg.FilterIndex = 2
		sfdlg.ShowDialog ()
		form.textbox2.Text = sfdlg.FileName
	}
	function checkboxClick (sender, e : EventArgs) {
		var state = form.checkbox.Checked ? false : true
		form.textbox2.Enabled = state
		form.filebrowse2.Enabled = state
		form.label2.Enabled = state
	}
}

EventsInstance = new Events

options = {
	width: 350, height: 200, hspc: 9, vspc: 12, button_vadj: 2,
	indent: 7, button_width: 75, button_height: 24
}

Console.WriteLine ("Изменение порядка бит в файле (DEBUG)")

form = new BitrevForm ()

form.Show ()
